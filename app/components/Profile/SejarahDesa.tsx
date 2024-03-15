"use client"

import {
  Accordion,
  Box,
  Grid,
  Image,
  Spoiler,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core"
import { IconClipboardOff } from "@tabler/icons-react"
import { useAtomValue } from "jotai"

import { DimmedNotice } from "#components/DimmedNotice.tsx"
import { HTMLRenderer } from "#components/HTMLRenderer.tsx"

import { desaProfileAtom } from "#providers/desa-profile.ts"
import { schemaAtom, aliasDesaAtom, namaDesaAtom } from "#providers/profile.ts"

import { asset } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

function SejarahDesa() {
  const schema = useAtomValue(schemaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const namaDesa = useAtomValue(namaDesaAtom)

  const clientProfile = useAtomValue(desaProfileAtom)
  const { history } = clientProfile ?? {}

  const isPhotoAvailable = history?.photoURL !== ""

  return (
    <>
      {/* Mobile */}
      <Accordion variant="separated" radius="md" hiddenFrom="sm">
        <Accordion.Item value="1" bg={"#fff"}>
          <Accordion.Control>
            <Text fz={14} fw={"bold"}>
              Sejarah {aliasDesa}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              {history != null && isPhotoAvailable ? (
                <Image
                  src={asset.common({ schema, file: history?.photoURL })}
                  alt="Foto Desa Terdahulu"
                  radius="md"
                />
              ) : (
                ""
              )}
              <TypographyStylesProvider pl={0}>
                <HTMLRenderer>{history?.content ?? ""}</HTMLRenderer>
              </TypographyStylesProvider>
              <Box display={contentsOrNone(history?.content == "")}>
                <DimmedNotice
                  icon={IconClipboardOff}
                  message="Belum Ada Data"
                />
              </Box>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {/* End Mobile */}

      {/* Desktop */}
      <Grid gutter={"xl"} visibleFrom="sm">
        <Grid.Col span={history != null && isPhotoAvailable ? 6 : 12}>
          <Stack>
            <Title style={{ textTransform: "uppercase" }}>
              Sejarah {aliasDesa} {namaDesa}
            </Title>
            <Box display={contentsOrNone(history?.content != "")}>
              <Spoiler
                maxHeight={18.5 * 16}
                showLabel="Selengkapnya"
                hideLabel="Sembunyikan"
              >
                <TypographyStylesProvider fz={18} pl={0}>
                  <HTMLRenderer>{history?.content ?? ""}</HTMLRenderer>
                </TypographyStylesProvider>
              </Spoiler>
            </Box>
            <Box display={contentsOrNone(history?.content == "")}>
              <DimmedNotice
                icon={IconClipboardOff}
                message={`Belum ada sejarah ${aliasDesa}`}
              />
            </Box>
          </Stack>
        </Grid.Col>
        {history != null && isPhotoAvailable ? (
          <Grid.Col span={6}>
            <Box>
              <Image
                src={asset.common({ schema, file: history?.photoURL })}
                alt="Foto Desa Terdahulu"
                radius="md"
                w={"100%"}
                style={{ float: "right" }}
              />
            </Box>
          </Grid.Col>
        ) : (
          ""
        )}
      </Grid>
      {/* End Desktop */}
    </>
  )
}

export default SejarahDesa
