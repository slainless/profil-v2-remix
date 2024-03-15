"use client"

import { Modal, LoadingOverlay } from "@mantine/core"
import { useAtom } from "jotai"
import { useCallback, useEffect } from "react"

import { useReCAPTCHA } from "#components/Hooks/use-recaptcha.ts"

import {
  alertAtom,
  loadingAtom,
  phoneAtom,
  responseAtom,
} from "#providers/otp.ts"

import { getLocale } from "#locale/locale.ts"

import { Compiled, requestOTP } from "#services/.client/otp.ts"
import { getError, mustGetResponse } from "#services/response.ts"

import { errMsg, errTitle } from "#modules/strings.ts"

import { OTPPrompt } from "./OTPPrompt"

export function OTPModal() {
  const grecaptcha = useReCAPTCHA()

  const [loading, setLoading] = useAtom(loadingAtom)
  const [response, setResponse] = useAtom(responseAtom)
  const [alert, setAlert] = useAtom(alertAtom)

  const [phone, setPhone] = useAtom(phoneAtom)
  const locale = getLocale("ID")

  // const [pin, setPin] = useState<string>("")

  useEffect(() => {
    setResponse(undefined)
    setAlert(undefined)
    // setPin("")
  }, [phone])

  useEffect(() => {
    if (phone == null) return
    if (grecaptcha == null) return
    retry()
  }, [phone, grecaptcha])

  const retry = () => {
    setAlert(undefined)

    if (phone == null) return
    if (grecaptcha == null) return

    grecaptcha.ready(async () => {
      const captcha = await grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action: "request_otp" },
      )
      setLoading(true)
      try {
        const otp = await requestOTP(captcha, phone)
        const res = await mustGetResponse(otp, Compiled.otp)
        setResponse(res)
      } catch (err) {
        const e = await getError(err)
        setAlert({
          title: locale[errTitle(e.code)],
          message: locale[errMsg(e.code)],
          color: "red",
        })
      }
      setLoading(false)
    })
  }

  const onSubmitHandler = useCallback(
    (pin: string) => {
      if (response == null) return
      const event = new CustomEvent("submit_otp", {
        detail: {
          pin,
          transactionID: response.transaction_id,
          expireAt: response.expire_at,
        },
      })

      window.dispatchEvent(event)
    },
    [response],
  )

  return (
    <Modal.Root
      opened={phone != null}
      onClose={() => {
        setPhone(undefined)
      }}
      centered
      keepMounted={true}
      size="max-content"
      zIndex={300}
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
          <OTPPrompt
            number={phone}
            ready={response != null}
            expireAt={response?.expire_at}
            onRetry={retry}
            alert={alert}
            onAlertChange={setAlert}
            loading={loading}
            onLoadingChange={setLoading}
            onSubmit={onSubmitHandler}
            // pin={pin}
            // onPinChange={setPin}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}
