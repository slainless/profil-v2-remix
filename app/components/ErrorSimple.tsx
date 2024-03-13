import { Box, Title, Image, Button, Text, Stack, Group } from "@mantine/core"
import { Link, useNavigate } from "@remix-run/react"

import illustration404 from "Assets/404-illustration.svg"
import illustration500 from "Assets/mild-panic-illustration.svg"

import styles from "./Error.module.css"

const illustration = {
  404: illustration404,
  500: illustration500,
}

interface Error404Props {
  mainUrl: string
  title?: string
  message?: string
  icon?: keyof typeof illustration
}
export function ErrorSimple({ mainUrl, title, message, icon }: Error404Props) {
  const navigate = useNavigate()
  return (
    <Box className={styles.container}>
      <Image
        // component={NextImage}
        src={illustration[icon ?? 500]}
        maw={480}
        alt="404 error illustration"
        className={styles.image}
      />
      <Stack gap={0} className={styles.content}>
        <Title fw={900} mb={"md"} className={styles.title}>
          {title ?? "Halaman tidak ditemukan!"}
        </Title>
        <Text c="dimmed" className={styles.desc}>
          {message ??
            `Halaman yang Anda coba buka tidak ada. Anda mungkin salah mengetik
          alamatnya, atau halamannya telah dipindahkan ke URL lain. Jika Anda
          menganggap ini adalah kesalahan, hubungi kami.`}
        </Text>
        <Group mt="xl">
          <Button
            variant="outline"
            size="md"
            component={Link}
            to={mainUrl}
            color="green"
          >
            Halaman utama
          </Button>
          <Button
            variant="outline"
            size="md"
            color="blue"
            onClick={() => navigate(-1)}
          >
            Kembali
          </Button>
        </Group>
      </Stack>
    </Box>
  )
}
