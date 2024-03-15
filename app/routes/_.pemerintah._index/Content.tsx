"use client"

import {
  Box,
  Stack,
  Title,
  Text,
  Grid,
  Image,
  Tooltip,
  Card,
} from "@mantine/core"
import { IconUserX } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"
import PerangkatDesa from "#components/Profile/PerangkatDesa.tsx"
import { Spacer } from "#components/Spacer.tsx"

import { ProfileLoader } from "#providers/desa-profile.ts"
import { aliasDesaAtom } from "#providers/profile.ts"

import placeholder from "#assets/fallback.png"

import { orgMembersQuery } from "#queries/org.ts"

import { asset, withAtom } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

function Content() {
  const [{ data }] = useQuery({
    query: orgMembersQuery,
  })

  const aliasDesa = useAtomValue(aliasDesaAtom)

  const sotk = useMemo(() => {
    if (data) {
      return data.members?.map((item) => ({
        name: item.name,
        position: item.position,
        image: item.photoURL,
      }))
    }

    return []
  }, [data])

  return (
    <>
      <ProfileLoader />
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <PerangkatDesa />
        <Spacer />
        <Title fz={18} ta="center">
          Aparat Pemerintah {aliasDesa}
        </Title>
        <Grid>
          {sotk.map((item, index) => {
            return (
              <Grid.Col span={6} key={index}>
                <Tooltip label={`${item.name} - ${item.position}`}>
                  <Card
                    ta={"center"}
                    bg={vars("color-primary-5")}
                    shadow="sm"
                    radius="md"
                    withBorder
                  >
                    <Card.Section>
                      <Image
                        alt={`${item.name} - ${item.position}`}
                        fallbackSrc={placeholder}
                        bg={"#F6F6F6"}
                        fit="cover"
                        w={"100%"}
                        h={200}
                        src={withAtom(asset.staff)({ file: item.image })}
                      />
                    </Card.Section>
                    <Box pt={10}>
                      <Title fz={14} c="white">
                        {item.name}
                      </Title>
                      <Text fz={12} c="white">
                        {item.position}
                      </Text>
                    </Box>
                  </Card>
                </Tooltip>
              </Grid.Col>
            )
          })}
        </Grid>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Box visibleFrom="sm">
        <Stack>
          <PerangkatDesa />
          <Spacer />
          <Title tt={"uppercase"}>Aparat Pemerintah {aliasDesa}</Title>
          <Grid>
            {sotk.map((item, index) => {
              return (
                <Grid.Col span={3} key={index}>
                  <Tooltip label={`${item.name} - ${item.position}`}>
                    <Card
                      ta={"center"}
                      bg={vars("color-primary-4")}
                      shadow="sm"
                      radius="md"
                      withBorder
                    >
                      <Card.Section>
                        <Image
                          bg={"#F6F6F6"}
                          alt={`${item.name} - ${item.position}`}
                          fallbackSrc={placeholder}
                          fit="cover"
                          h={300}
                          w={"100%"}
                          src={withAtom(asset.staff)({ file: item.image })}
                        />
                      </Card.Section>
                      <Box pt={10}>
                        <Title fz={20} c="white">
                          {item.name}
                        </Title>
                        <Text fz={14} c="white">
                          {item.position}
                        </Text>
                      </Box>
                    </Card>
                  </Tooltip>
                </Grid.Col>
              )
            })}
          </Grid>

          <Box
            display={contentsOrNone(
              data?.members != null && data.members.length == 0,
            )}
          >
            <DimmedNotice
              icon={IconUserX}
              message={`Belum ada data aparat pemerintah ${aliasDesa.toLowerCase}`}
            />
          </Box>
        </Stack>
      </Box>
      {/* End Desktop */}
    </>
  )
}

export default Content
