import { Box, Title, Image, Text, Code } from "@mantine/core"

import illustration from "#assets/error-illustration.svg"

import styles from "./Error.module.css"

export function ErrorWithStackTrace({
  stackTrace,
  message,
}: {
  stackTrace?: string
  message?: string
}) {
  return (
    <Box className={styles.container}>
      <Image
        // component={NextImage}
        src={illustration}
        alt="error illustration"
        className={styles.image}
      />
      <Box className={styles.content}>
        <Title fw={900} mb={"md"} className={styles.title}>
          Ada yang tidak beres...
        </Title>
        <Text c="dimmed" className={styles.desc} mb={"md"}>
          Terjadi masalah pada website, mohon untuk pesan gangguan ini agar
          segera diteruskan kepada aparat atau administrasi DIGIDES sehingga
          gangguan dapat segera diperbaiki. Mohon maaf atas ketidaknyamanannya
          🙏.
        </Text>
        <Code mb="md">{message ?? "No message"}</Code>
        <Code block style={{ display: "grid" }}>
          {stackTrace ?? "No stack trace"}
        </Code>
      </Box>
    </Box>
  )
}
