import { Box, Text, Title } from "@mantine/core"

export interface OAuthRedirectNoticeProps {
  serviceLabel: string
}
export function OAuthRedirectNotice(props: OAuthRedirectNoticeProps) {
  return (
    <Box>
      <Title c="green">Berhasil masuk dengan {props.serviceLabel}</Title>
      <Text mt={12}>
        Anda akan segera diarahkan ke halaman login atau register
      </Text>
    </Box>
  )
}
