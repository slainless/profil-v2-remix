import { typeboxResolver } from "@hookform/resolvers/typebox"
import {
  Alert,
  Anchor,
  Button,
  Center,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import { IconAt, IconPhone } from "@tabler/icons-react"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

import { vars } from "#theme/artifact/vars.mjs"

import { useReCAPTCHA } from "#components/Hooks/use-recaptcha.ts"
import { PhoneNumberInput } from "#components/PhoneNumberInput.tsx"

import digidesLogo from "#assets/maskot digides-head-only.svg"

import { RegisterPayload, Schema } from "#services/.client/register.ts"
import { Service } from "#services/oauth.ts"

import { parsePhoneNumber } from "#modules/intl.ts"

export interface RegisterFormPrefill {
  name: string
  email: string
  source: Service
  token: string
}

interface RegisterFormProps {
  prefill?: RegisterFormPrefill

  loading?: boolean
  onChangeLoading?: () => void

  onRegisterSubmit?: (payload: RegisterPayload) => void

  onLoginClick?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  alert?: { title?: string; message?: string; color?: any }
  onAlertClose?: () => void
}
export function RegisterForm({ prefill, ...props }: RegisterFormProps) {
  const resolver = useMemo(() => typeboxResolver(Schema.form), [])
  const {
    register,
    formState,
    formState: { errors },
    getValues,
    setValue,
    setError,
    handleSubmit,
  } = useForm<RegisterPayload>({
    resolver,
  })

  useEffect(() => {
    // @ts-expect-error ...
    if (getValues("password") !== getValues("confirm_password"))
      // @ts-expect-error ...
      setError("confirm_password", {
        type: "value",
        message: "Password tidak sama",
      })
  }, [formState])

  const hasDefaultEmail = prefill?.email != null && prefill.email !== ""

  const grecaptcha = useReCAPTCHA()
  const [, setIsLoggingIn] = useUncontrolled({
    value: props.loading,
    defaultValue: false,
    onChange: props.onChangeLoading,
  })
  const registerCallback = handleSubmit((data) => {
    if (grecaptcha == null) return
    if (props.onRegisterSubmit == null) return
    grecaptcha.ready(async () => {
      const captcha = await grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action: "login_user" },
      )
      setIsLoggingIn(true)
      await props.onRegisterSubmit?.({
        ...data,
        phone_number: parsePhoneNumber(data.phone_number) as string,
        captcha,
      })
      setIsLoggingIn(false)
    })
  })

  useEffect(() => {
    if (prefill == null) return
    setValue("access_token", prefill.token)
    setValue("email", prefill.email)
    setValue("name", prefill.name)
    setValue("service", prefill.source)
  }, [prefill])
  return (
    <Stack gap={6} w={280}>
      <Text fz={32} fw={700} ta="center">
        Daftar
      </Text>
      <Center fz={14} opacity={0.7}>
        Bergabung ke platform DIGIDES <Image src={digidesLogo} w={24} ml={6} />
      </Center>
      {props.alert != null && (
        <Alert
          variant="light"
          color={props.alert.color ?? "red"}
          withCloseButton
          my={12}
          onClose={props.onAlertClose}
          styles={{ body: { gap: "0" } }}
          title={props.alert.title}
          p="xs"
        >
          {props.alert.message}
        </Alert>
      )}
      <form style={{ display: "contents" }} onSubmit={registerCallback}>
        <Stack gap={6}>
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            {...register("name")}
            defaultValue={prefill?.name}
            error={errors.name?.message}
          />
          <TextInput
            label="Username"
            {...register("username")}
            placeholder="Masukkan username"
            error={errors.username?.message}
          />
          <TextInput
            leftSection={<IconAt size={16} />}
            label="Email"
            placeholder="Masukkan email"
            {...register("email")}
            value={hasDefaultEmail ? prefill?.email : undefined}
            readOnly={hasDefaultEmail}
            disabled={hasDefaultEmail}
            error={errors.email?.message}
          />
          <PhoneNumberInput
            leftSection={<IconPhone size={16} />}
            label="No. Telepon"
            placeholder="Masukkan no. telepon"
            {...register("phone_number")}
            // @ts-expect-error ...
            error={errors.phone_number?.message}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            label="Konfirmasi Password"
            placeholder="Masukkan ulang password"
            // @ts-expect-error ...
            {...register("confirm_password")}
            // @ts-expect-error ...
            error={errors.confirm_password?.message}
          />
          <input type="hidden" {...register("tid")} />
          <input type="hidden" {...register("pin")} />
          <input
            type="hidden"
            {...register("service")}
            value={prefill?.source}
          />
          <input
            type="hidden"
            {...register("access_token")}
            value={prefill?.token}
          />
          <Button fullWidth mt={6} loading={props.loading} type="submit">
            Daftar
          </Button>
          <Text
            c={vars("color-dimmed")}
            fz={15}
            ta="center"
            mt={12}
            onClick={props.onLoginClick}
          >
            Sudah ada akun? <Anchor>masuk sekarang</Anchor>
          </Text>
        </Stack>
      </form>
    </Stack>
  )
}
