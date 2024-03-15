import {
  Alert,
  Anchor,
  Box,
  Button,
  PinInput,
  Stack,
  Text,
} from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import { TypeCompiler } from "@sinclair/typebox/compiler"
import { NationalNumber } from "libphonenumber-js"
import { FormEvent, useCallback, useEffect } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { useExpireCounter } from "#components/Hooks/use-expire-counter.ts"
import { SimpleCounter } from "#components/SimpleCounter.tsx"

import { Schema } from "#services/.client/otp.ts"
import { Feedback } from "#services/response.ts"

export interface OTPPromptProps {
  number?: NationalNumber
  ready?: boolean
  expireAt?: number

  pin?: string
  onPinChange?: (pin: string) => void

  onRetry?: () => void

  loading?: boolean
  onLoadingChange?: (loading: boolean) => void

  alert?: Feedback
  onAlertChange?: (alert: Feedback | undefined) => void

  onSubmit?: (pin: string) => void
}

const pinValidator = TypeCompiler.Compile(Schema.payload.properties.pin)

export function OTPPrompt({
  number,
  ready,
  expireAt,
  onRetry,
  onSubmit,
  pin,
  onPinChange,
  ...props
}: OTPPromptProps) {
  const [value, setValue] = useUncontrolled({
    value: pin,
    defaultValue: "",
    onChange: onPinChange,
  })
  const [loading] = useUncontrolled({
    value: props.loading,
    defaultValue: false,
    onChange: props.onLoadingChange,
  })

  const [alert, setAlert] = useUncontrolled<Feedback | undefined>({
    value: props.alert,
    defaultValue: undefined,
    onChange: props.onAlertChange,
  })

  const handler = useCallback(
    (e: FormEvent) => {
      if (onSubmit == null) return
      e.preventDefault()
      if (pinValidator.Check(value)) {
        setValue("")
        onSubmit(value)
      }
    },
    [onSubmit, value],
  )

  const { remaining, isExpired } = useExpireCounter(expireAt)
  useEffect(() => {
    setValue("")
  }, [number])

  return (
    <Stack gap={6} w={320} align="center">
      <Text fz={24} fw={600}>
        Masukkan kode verifikasi
      </Text>
      {alert != null && (
        <Alert
          variant="light"
          color="red"
          withCloseButton
          my={12}
          w="100%"
          onClose={() => setAlert(undefined)}
          styles={{ body: { gap: "0" } }}
          title={alert.title}
          p="xs"
        >
          {alert.message}
        </Alert>
      )}
      <Box fz={12} ta="center" c={vars("color-dimmed")}>
        {isExpired ? (
          <Text>
            Kode akan dikirimkan ke nomor{" "}
            <Text component="strong" fw={500} c={vars("color-text")}>
              +62{number}
            </Text>{" "}
            melalui SMS.
            <br></br>
            <Text component="strong" fw={500} c="red">
              Kode sudah tidak valid.
            </Text>
          </Text>
        ) : (
          <Text>
            Kode dikirimkan ke nomor{" "}
            <Text component="strong" fw={500} c={vars("color-text")}>
              +62{number}
            </Text>{" "}
            melalui SMS, kode akan mati dalam:{" "}
            <Text component="strong" fw={500} c={vars("color-text")}>
              <SimpleCounter remaining={remaining} />{" "}
            </Text>
          </Text>
        )}

        <Text mt={6}>
          <Anchor
            onClick={() => {
              setValue("")
              onRetry?.()
            }}
          >
            Klik disini
          </Anchor>{" "}
          untuk mengirim ulang kode.
        </Text>
      </Box>
      <form style={{ display: "contents" }} onSubmit={handler}>
        <PinInput
          length={6}
          mt={24}
          value={value}
          onChange={setValue}
          name="pin"
        />
        <Button
          mt={12}
          size="md"
          loading={loading}
          type="submit"
          disabled={
            ready === false || isExpired || pinValidator.Check(value) === false
          }
        >
          Verifikasi
        </Button>
      </form>
    </Stack>
  )
}
