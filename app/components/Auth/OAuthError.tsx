import { Box, Code, Text, Title } from "@mantine/core"

export interface OAuthErrorProps {
  serviceLabel: string
  code: string
}

// TODO: add illustration
export function OAuthError(props: OAuthErrorProps) {
  return (
    <Box>
      <Title size="h1" c="red">
        Terjadi kesalahan saat masuk melalui {props.serviceLabel}
      </Title>
      <Text mt={12}>
        Silakan tutup tab/jendela ini dan ulangi masuk dengan{" "}
        {props.serviceLabel} atau masuk dengan akun DIGIDES anda
      </Text>
      <Text>
        <Code>Error code: {props.code}</Code>
      </Text>
    </Box>
  )
}
