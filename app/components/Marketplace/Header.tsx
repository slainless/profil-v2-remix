"use client"

import { Box, Text, Title } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { aliasDesaAtom } from "Providers/profile.ts"

function Header() {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  return (
    <Box>
      <Title
        fz={{ base: 20, sm: 44 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-4")}
      >
        Beli Dari {aliasDesa}
      </Title>
      <Text
        fz={{ base: "md", sm: 20 }}
        ta={{
          base: "center",
          sm: "start",
          md: "start",
        }}
      >
        Layanan yang disediakan promosi produk UMKM{" "}
        <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span> sehingga
        mampu meningkatkan perekonomian masyarakat{" "}
        <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
      </Text>
    </Box>
  )
}

export default Header
