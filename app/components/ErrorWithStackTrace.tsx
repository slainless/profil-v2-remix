import { CodeHighlight, InlineCodeHighlight } from "@mantine/code-highlight"
import { Box, Title, Image, Text } from "@mantine/core"

import illustration from "Assets/error-illustration.svg"

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
        <InlineCodeHighlight code={message ?? "No message"} mb={"md"} />
        <CodeHighlight
          code={stackTrace ?? "No stack trace"}
          style={{ display: "grid" }}
        />
      </Box>
    </Box>
  )
}
