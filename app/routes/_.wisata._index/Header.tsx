"use client"

import { Box, Title, Text } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { namaDesaAtom, aliasDesaAtom } from "Providers/profile.ts"

export const Header = () => {
  const namaDesa = useAtomValue(namaDesaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  return (
    <Box>
      <Title
        tt={"uppercase"}
        fz={{ base: 20, sm: 44 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-4")}
      >
        WISATA {aliasDesa}
      </Title>
      <Text
        fz={{ base: "md", sm: 20 }}
        ta={{
          base: "center",
          sm: "start",
          md: "start",
        }}
      >
        Segala hal mengenai wisata {aliasDesa} {namaDesa}
      </Text>
    </Box>
  )
}