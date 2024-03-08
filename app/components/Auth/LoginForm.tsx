"use client"

import { typeboxResolver } from "@hookform/resolvers/typebox"
import {
  Alert,
  Anchor,
  Box,
  Button,
  Center,
  Image,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import { useCallback } from "react"
import { useForm } from "react-hook-form"

import { vars } from "Theme/artifact/vars.mjs"

import { useReCAPTCHA } from "Components/Hooks/use-recaptcha.ts"

import digidesLogo from "Assets/maskot digides-head-only.svg"

import {
  FormPayload,
  LoginPayload,
  LoginWithThirdPartyPayload,
  Schema,
} from "Services/.client/login.ts"
import { Service } from "Services/oauth"

import styles from "./LoginForm.module.css"
import { OAuthButton } from "./OAuthButton"

export type LoadingType = "third_party" | "traditional" | false | undefined
export interface LoginFormProps {
  onLoginSubmit?: (
    payload: LoginPayload | LoginWithThirdPartyPayload,
  ) => PromiseLike<void>
  onRegisterClick?: () => void
  onResetClick?: () => void
  alert?: { title?: string; message?: string }
  onAlertClose?: () => void
  loading?: LoadingType
  onChangeLoading?: (newValue: LoadingType) => void
}

const resolver = typeboxResolver(Schema.form)

export function LoginForm({
  onLoginSubmit,
  onRegisterClick,
  onResetClick,
  alert,
  onAlertClose,
  loading,
  onChangeLoading,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPayload>({ resolver })
  const grecaptcha = useReCAPTCHA()
  const oauthLoginCallback = useCallback(
    (token: string, service: Service) => {
      if (grecaptcha == null) return
      if (onLoginSubmit == null) return
      grecaptcha.ready(async () => {
        const captcha = await grecaptcha.execute(
          import.meta.env.VITE_RECAPTCHA_SITE_KEY,
          { action: "login_user" },
        )
        setIsLoggingIn("third_party")
        await onLoginSubmit({
          accessToken: token,
          captcha,
          service,
        })
        setIsLoggingIn(false)
      })
    },
    [onLoginSubmit, grecaptcha],
  )

  const [isLoggingIn, setIsLoggingIn] = useUncontrolled({
    value: loading,
    defaultValue: false,
    onChange: onChangeLoading,
  })
  const loginCallback = handleSubmit((data) => {
    if (grecaptcha == null) return
    if (onLoginSubmit == null) return
    grecaptcha.ready(async () => {
      const captcha = await grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action: "login_user" },
      )
      setIsLoggingIn("traditional")
      await onLoginSubmit({
        id: data.id,
        password: data.password,
        captcha,
      })
      setIsLoggingIn(false)
    })
  })

  return (
    <Stack gap={6} w={280}>
      <form style={{ display: "contents" }} onSubmit={loginCallback}>
        <Stack gap={6} mb={12}>
          <Text fz={32} fw={700} ta="center">
            Masuk
          </Text>
          <Center fz={14} opacity={0.7}>
            Masuk dengan akun DIGIDES <Image src={digidesLogo} w={24} ml={6} />
          </Center>
          {alert != null && (
            <Alert
              variant="light"
              color="red"
              withCloseButton
              my={12}
              onClose={onAlertClose}
              styles={{ body: { gap: "0" } }}
              title={alert.title}
              p="xs"
            >
              {alert.message}
            </Alert>
          )}
          <TextInput
            {...register("id")}
            label="Identitas"
            placeholder="Username/Email/No. Telepon"
            disabled={!!isLoggingIn}
            error={errors.id?.message}
          />
          <PasswordInput
            {...register("password")}
            label="Password"
            placeholder="Password"
            disabled={!!isLoggingIn}
            error={errors.password?.message}
          />
          {/* <Checkbox label="Ingat saya" /> */}
        </Stack>
        <Button
          fullWidth
          type="submit"
          loading={isLoggingIn == "traditional"}
          disabled={!!isLoggingIn}
        >
          Masuk
        </Button>
      </form>
      <Box className={styles.separator} aria-hidden>
        atau
      </Box>
      <SimpleGrid cols={2} spacing={6}>
        <OAuthButton
          service={Service.Google}
          loading={isLoggingIn == "third_party"}
          disabled={!!isLoggingIn}
          onTokenGet={oauthLoginCallback}
        />
        <OAuthButton
          loading={isLoggingIn == "third_party"}
          disabled={!!isLoggingIn}
          service={Service.Facebook}
          onTokenGet={oauthLoginCallback}
        />
      </SimpleGrid>
      <Text c={vars("color-dimmed")} fz={15} ta="center" mt={12}>
        Belum ada akun?{" "}
        <Anchor onClick={onRegisterClick}>daftar sekarang</Anchor>
      </Text>
      <Text c={vars("color-dimmed")} fz={15} ta="center" mt={-12}>
        Lupa password,{" "}
        <Anchor c={vars("color-red-7")} onClick={onResetClick}>
          reset disini
        </Anchor>
      </Text>
    </Stack>
  )
}
