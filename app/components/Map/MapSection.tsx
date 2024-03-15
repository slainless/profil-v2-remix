"use client"

import { Stack, Box, Title, Text } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"

import { aliasDesaAtom, desaAtom } from "#providers/profile.ts"

import IframeMap from "./IframeMap"
import { InteractiveMap } from "./InteractiveMap"

const customGeospatials: Record<string, string> = {
  sengaselatan:
    "https://assets.digitaldesa.id/geospasial/sengaselatan/index.html?gestureHandling=1",
  barowa:
    "https://assets.digitaldesa.id/geospasial/barowa/index.html?gestureHandling=1",
  janetallasa:
    "https://assets.digitaldesa.id/geospasial/janetallasa/index.html?gestureHandling=1",
}

function MapSection({ slug }: { slug?: string }) {
  return (
    <Stack>
      <Header />
      <Box mt="md">
        {slug != null && customGeospatials[slug] != null ? (
          <IframeMap url={customGeospatials[slug]} />
        ) : (
          <InteractiveMap />
        )}
      </Box>
    </Stack>
  )
}

export default MapSection

const Header = () => {
  const alias = useAtomValue(aliasDesaAtom)
  const desa = useAtomValue(desaAtom)
  return (
    <Box>
      <Title
        tt={"uppercase"}
        fz={{ base: 20, sm: 44 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-5")}
      >
        Peta {alias}
      </Title>
      <Text
        fz={{ base: "md", sm: 20 }}
        ta={{
          base: "center",
          sm: "start",
          md: "start",
        }}
      >
        Menampilkan Peta {alias} Dengan <em>Interest Point</em> {desa}
      </Text>
    </Box>
  )
}
