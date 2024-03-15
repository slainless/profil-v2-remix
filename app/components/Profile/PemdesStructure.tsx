"use client"

import { Accordion, Box, Stack, Text, Title } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"

import { Spacer } from "#components/Spacer.tsx"

import { profileAtom } from "#providers/profile.ts"

import { capitalizeEachWord } from "#modules/intl.ts"

import PerangkatBPD from "./PerangkatBPD.tsx"
import PerangkatDesa from "./PerangkatDesa.tsx"

const PemdesStructure = () => {
  const profile = useAtomValue(profileAtom)

  return (
    <>
      {/* Mobile */}
      <Accordion variant="separated" radius="md" hiddenFrom="sm">
        <Accordion.Item value="1" bg={"#fff"}>
          <Accordion.Control>
            <Text fz={14} fw={"bold"}>
              Bagan {profile.alias.desa}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              <Box>
                <Text ta={"center"} fz={14}>
                  Struktur Organisasi Pemerintahan {profile.alias.desa}
                </Text>
                <PerangkatDesa />
              </Box>
              <Box>
                <Text ta={"center"} fz={14}>
                  Struktur Organisasi {capitalizeEachWord(profile.alias.BPD)}
                </Text>
                <PerangkatBPD />
              </Box>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack gap={50} visibleFrom="sm">
        <Box>
          <Title tt={"uppercase"} fz={44} c={vars("color-primary-5")}>
            Bagan {profile.alias.desa}
          </Title>
          <Text fz={20}>
            Bagan Struktur {`${profile.alias.desa} ${profile.name.deskel}`}
          </Text>
        </Box>
        <Box>
          <Title tt={"uppercase"} fz={32}>
            Struktur Organisasi Pemerintahan {profile.alias.desa}
          </Title>
          <PerangkatDesa />
        </Box>
        <Spacer />
        <Box>
          <Title tt={"uppercase"} fz={32}>
            Struktur Organisasi {profile.alias.BPD}
          </Title>
          <PerangkatBPD />
        </Box>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default PemdesStructure
