"use client"

import { Box, Title, Text } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"

import { namaDesaAtom, aliasDesaAtom } from "#providers/profile.ts"

export const Header = () => {
  const namaDesa = useAtomValue(namaDesaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  return (
    <Box>
      <Title
        fz={{ base: 20, sm: 44 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-4")}
      >
        Berita {aliasDesa}
      </Title>
      <Text
        fz={{ base: "md", sm: 20 }}
        ta={{
          base: "center",
          sm: "start",
          md: "start",
        }}
      >
        Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan
        artikel-artikel jurnalistik dari {`${aliasDesa} ${namaDesa}`}
      </Text>
    </Box>
  )
}
