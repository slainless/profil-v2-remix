import { LoadingOverlay, Modal } from "@mantine/core"
import { useSetAtom } from "jotai"
import { createElement, useCallback, useState } from "react"

import { useOTP } from "#components/Hooks/use-otp.ts"
import { useReCAPTCHA } from "#components/Hooks/use-recaptcha.ts"
import { SimpleCounter } from "#components/SimpleCounter.tsx"

import { credentialAtom, usernameAtom } from "#providers/user.ts"

import { getLocale } from "#locale/locale.ts"

import {
  Compiled,
  LoginPayload,
  LoginWithThirdPartyPayload,
  TokenResponse,
  login,
} from "#services/.client/login.ts"
import { RegisterPayload, register } from "#services/.client/register.ts"
import { ErrorCode, is } from "#services/data.ts"
import {
  mustGetResponse,
  getError,
  type Feedback,
  getErrorTitle,
  getErrorMessage,
} from "#services/response.ts"

import { LoginForm } from "./LoginForm.tsx"
import { RegisterForm, RegisterFormPrefill } from "./RegisterForm.tsx"

interface AuthModalProps {
  opened: boolean
  onClose: () => void
  onSuccess?: (data: TokenResponse) => void
}

export function AuthModal({ onSuccess, ...props }: AuthModalProps) {
  const [formType, setFormType] = useState<
    "login" | "register" | "forgot_pass"
  >("login")

  const grecaptcha = useReCAPTCHA()

  const setCredential = useSetAtom(credentialAtom)
  const setUsername = useSetAtom(usernameAtom)
  // const [lastResponse, setLastResponse] =
  //   useState<StandardResponse<TokenResponse>>()

  const [loading, setLoading] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<Feedback>()
  const [registerError, setRegisterError] = useState<Feedback>()
  const [registerPrefill, setRegisterPrefill] = useState<RegisterFormPrefill>()

  const resetCallback = useCallback(() => {
    setLoginError(undefined)
    setRegisterError(undefined)
    setRegisterPrefill(undefined)
    setRegisterPayload(undefined)
  }, [])

  const loginCallback = useCallback(
    async (payload: LoginPayload | LoginWithThirdPartyPayload) => {
      resetCallback()
      // setLastResponse(undefined)
      setLoading(true)
      try {
        const res = await login(payload)
        const data = await mustGetResponse(res, Compiled.token)
        onSuccess?.(data)
        setCredential(data)
        setUsername(data.username)
        resetCallback()
      } catch (err) {
        const e = await getError(err)
        if (is.notRegisteredError(e)) {
          setFormType("register")
          setRegisterPrefill({
            name: e.error.name,
            email: e.error.email,
            source: e.error.source,
            token: e.error.access_token,
          })
          setRegisterError({
            title: getErrorTitle(getLocale("ID"), e),
            message: getErrorMessage(getLocale("ID"), e),
            color: "yellow",
          })
        } else if (is.retryCooldownError(e)) {
          const last = Date.parse(e.error.last_attempt)
          const waitTime = e.error.wait_time / 1e6
          setLoginError({
            title: getErrorTitle(getLocale("ID"), e),
            message: createElement("span", {}, [
              getErrorMessage(getLocale("ID"), e),
              createElement("br"),
              "Sisa waktu menunggu: ",
              createElement(SimpleCounter, {
                expireAt: last + waitTime,
              }),
            ]),
          })
        } else {
          setLoginError({
            title: getErrorTitle(getLocale("ID"), e),
            message: getErrorMessage(getLocale("ID"), e),
          })
        }
      }

      setLoading(false)
    },
    [onSuccess],
  )

  const [registerPayload, setRegisterPayload] = useState<RegisterPayload>()
  const {
    open: openOTP,
    close: closeOTP,
    setAlert: setOTPError,
    setLoading: setOTPLoading,
  } = useOTP((payload) => {
    if (registerPayload == null) return
    if (grecaptcha == null)
      return setOTPError({
        title: "ReCAPTCHA belum siap",
        message: "Silakan coba lagi",
      })

    grecaptcha.ready(async () => {
      const captcha = await grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action: "register_user" },
      )
      const p = {
        ...registerPayload,
        ...payload,
        captcha,
      }

      setOTPLoading(true)
      setLoading(true)

      try {
        const res = await register(p)
        const data = await mustGetResponse(res, Compiled.token)
        onSuccess?.(data)
        closeOTP()
        setCredential(data)
        setUsername(data.username)
        resetCallback()
        setFormType("login")
      } catch (err) {
        const e = await getError(err)
        switch (e.code) {
          case ErrorCode.WrongOTP:
          case ErrorCode.BadGateway:
          case ErrorCode.CaptchaError:
          case ErrorCode.FailedFetch:
          case ErrorCode.GatewayTimeout:
          case ErrorCode.Timeout:
            break
          default:
            closeOTP()
            break
        }
        setOTPError({
          title: getErrorTitle(getLocale("ID"), e),
          message: getErrorMessage(getLocale("ID"), e),
        })
      }

      setOTPLoading(false)
      setLoading(false)
    })
  })
  const registerCallback = useCallback((data: RegisterPayload) => {
    setRegisterPayload(data)
    openOTP(data.phone_number)
  }, [])

  return (
    <Modal.Root
      opened={props.opened}
      onClose={() => {
        resetCallback()
        props.onClose()
      }}
      centered
      size="max-content"
    >
      <Modal.Overlay />
      <Modal.Content pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Modal.CloseButton pos="absolute" right={6} top={6} />
        <Modal.Body p={24} pt={48}>
          <div style={{ display: formType == "login" ? "contents" : "none" }}>
            <LoginForm
              onRegisterClick={() => setFormType("register")}
              onLoginSubmit={loginCallback}
              onAlertClose={() => setLoginError(undefined)}
              alert={loginError}
            />
          </div>
          <div
            style={{ display: formType == "register" ? "contents" : "none" }}
          >
            <RegisterForm
              onLoginClick={() => setFormType("login")}
              alert={registerError}
              onAlertClose={() => setRegisterError(undefined)}
              prefill={registerPrefill}
              onRegisterSubmit={registerCallback}
            />
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
