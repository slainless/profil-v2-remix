"use client"

import { Box, Title, Text } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { aliasDesaAtom } from "Providers/profile.ts"

export const GalleryHeader = () => {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  return (
    <Box>
      <Title
        tt={"uppercase"}
        fz={{ base: 20, sm: 44 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-4")}
      >
        GALERI {aliasDesa}
      </Title>
      <Text
        fz={{ base: "md", sm: 20 }}
        ta={{
          base: "center",
          sm: "start",
          md: "start",
        }}
      >
        Menampilkan kegiatan-kegiatan yang berlangsung di{" "}
        <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
      </Text>
    </Box>
  )
}
