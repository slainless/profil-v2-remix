"use client"

import {
  Box,
  Grid,
  Image,
  Stack,
  Title,
  Text,
  List,
  Space,
  Accordion,
  SimpleGrid,
} from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useQuery } from "urql"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import { desaProfileAtom } from "#providers/desa-profile.ts"
import {
  aliasDesaAtom,
  namaDesaAtom,
  profileAtom,
  schemaAtom,
} from "#providers/profile.ts"

import placeholder from "#assets/fallback.png"
import hero from "#assets/hero.png"

import { welcomeQuery } from "#queries/profile.ts"

import { asset } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

function VisiMisi() {
  const schema = useAtomValue(schemaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const namaDesa = useAtomValue(namaDesaAtom)
  const profile = useAtomValue(profileAtom)
  const [{ data }] = useQuery({ query: welcomeQuery })

  const clientProfile = useAtomValue(desaProfileAtom)

  return (
    <>
      {/* Mobile */}
      <Stack gap={"lg"} hiddenFrom="sm">
        <Box
          pos={"relative"}
          w={"100%"}
          h={175}
          bg={"rgb(97, 203, 184)"}
          style={{ borderRadius: 10 }}
        >
          <SimpleGrid cols={2} spacing="xs">
            <Image
              pos={"absolute"}
              bottom={0}
              w={170}
              fit="contain"
              fallbackSrc={placeholder}
              src={asset.common({
                schema,
                file: data?.profile?.welcome.photoURL,
              })}
              alt="other"
            />
            <Box>
              <Image
                pos={"absolute"}
                right={30}
                bottom={10}
                ta={"start"}
                w={150}
                src={hero}
                alt="other"
              />
              <Stack
                gap={0}
                w={160}
                ta={"center"}
                pos={"absolute"}
                right={15}
                bottom={10}
                style={{ textShadow: "1px 1px black" }}
              >
                <Title fz={15} lh={1} fw={"bold"} tt={"uppercase"} c={"#fff"}>
                  {data?.profile?.welcome.personName}
                </Title>
                <Text fz={12} lh={1} c={"#fff"}>
                  {data?.profile?.welcome.personRole}
                </Text>
              </Stack>
            </Box>
          </SimpleGrid>
        </Box>
        <Accordion variant="separated" radius="md">
          <Accordion.Item value="1" bg={"#fff"}>
            <Accordion.Control>
              <Text fz={14} fw={"bold"}>
                Visi
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text c={"#5A5E62"} fz={14}>
                {clientProfile?.vision}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="2" bg={"#fff"}>
            <Accordion.Control>
              <Text fz={14} fw={"bold"}>
                Misi
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <List type="ordered" c={"#5A5E62"} fz={14} spacing={4}>
                {clientProfile?.mission.map((mission) => (
                  <List.Item key={mission}>{mission}</List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Grid
        justify="center"
        align="center"
        grow
        style={{ overflow: "visible" }}
        visibleFrom="sm"
      >
        <Grid.Col span={6}>
          <Stack gap={0} align="center">
            <Image
              w={300}
              src={asset.logo300({ schema, file: profile.logoURL })}
              alt="Visi Misi"
            />
            <Space h="md" />
            <Title tt={"uppercase"}>
              {aliasDesa} {namaDesa}
            </Title>
            <Text fw={600}>Provinsi {profile.name.provinsi}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack gap={10}>
            <Title fz={44} ta="center" mb={"sm"}>
              VISI
            </Title>
            <Box
              display={contentsOrNone(
                clientProfile?.vision != null &&
                  clientProfile?.vision.length > 0,
              )}
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Text c={"#5A5E62"} ta="center" fz={18} fw={600}>
                {clientProfile?.vision}
              </Text>
            </Box>
            <Box
              display={contentsOrNone(
                clientProfile?.vision != null &&
                  clientProfile?.vision.length == 0,
              )}
            >
              <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
            </Box>
            <Space h="md" />
            <Title fz={44} ta="center" mb={"sm"}>
              MISI
            </Title>
            <Box
              display={contentsOrNone(
                clientProfile?.mission != null &&
                  clientProfile?.mission.length > 0,
              )}
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <List
                type="ordered"
                c={"#5A5E62"}
                fz={18}
                ta={"justify"}
                pr={"xl"}
                spacing={4}
              >
                {clientProfile?.mission.map((mission) => (
                  <List.Item key={mission}>{mission}</List.Item>
                ))}
              </List>
            </Box>
            <Box
              display={contentsOrNone(
                clientProfile?.mission != null &&
                  clientProfile?.mission.length == 0,
              )}
            >
              <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>
      {/* End Desktop */}
    </>
  )
}

export default VisiMisi
