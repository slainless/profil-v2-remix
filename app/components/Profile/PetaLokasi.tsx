/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Box,
  Card,
  Divider,
  Grid,
  Image,
  Paper,
  Space,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTr,
  Text,
  Title,
} from "@mantine/core"
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { desaProfileAtom } from "#providers/desa-profile.ts"
import { aliasDesaAtom, namaDesaAtom } from "#providers/profile.ts"

import geografis from "#assets/geografis.png"

import { StringKv } from "#graphql/graphql.ts"

import { populationMutationSummaryQuery } from "#queries/stats.ts"

import { FormattedNumber, capitalize } from "#modules/intl.ts"

import BorderVillage from "./BorderVillageMap.tsx"

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const int = (v: number | null | undefined) => (v == null ? 0 : v)

const mapBorder = (borders: StringKv[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b: Record<string, any> = {
    Utara: "",
    Timur: "",
    Selatan: "",
    Barat: "",
  }
  for (const border of borders ?? []) {
    b[capitalize(border.name.replaceAll("_", " "))] = border.value
  }

  return b
}

function PetaLokasi() {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const namaDesa = useAtomValue(namaDesaAtom)
  const [{ data }] = useQuery({ query: populationMutationSummaryQuery })
  const stats = data?.summary
  const mutationOut =
    stats?.mutationOut == null || stats.mutationOut.length == 0
      ? [{ value: 0 }]
      : stats.mutationOut

  const clientProfile = useAtomValue(desaProfileAtom)
  const borders = useMemo(
    () => mapBorder(clientProfile?.borders ?? []),
    [clientProfile],
  )

  return (
    <>
      {/* Mobile */}
      <Stack gap={"xl"} hiddenFrom="sm">
        <Title
          tt={"uppercase"}
          fz={20}
          ta={"center"}
          c={vars("color-primary-4")}
        >
          PETA LOKASI {aliasDesa}
        </Title>
        <Box h={350}>
          <BorderVillage />
        </Box>
        <Title
          tt={"uppercase"}
          fz={20}
          ta={"center"}
          c={vars("color-primary-4")}
        >
          GEOGRAFIS {aliasDesa}
        </Title>
        <Grid hiddenFrom="sm" justify="center">
          <Grid.Col span={6}>
            <Image src={geografis} alt="other" />
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack gap={"lg"}>
              <Box>
                <Text fz={13}>Luas {aliasDesa}</Text>
                <Text fz={19} fw={"bold"}>
                  {clientProfile?.area !== undefined
                    ? FormattedNumber.format(clientProfile.area) + " ㎡"
                    : "0 ㎡"}
                </Text>
              </Box>
              <Box>
                <Text fz={13}>Jumlah Penduduk</Text>
                <Text fz={19} fw={"bold"}>
                  {stats?.total !== undefined
                    ? FormattedNumber.format(
                        int(stats.total) -
                          int(
                            mutationOut
                              .map((v: { value: any }) => v.value)
                              .reduce((a: any, b: any) => a + b),
                          ),
                      ) + " Jiwa"
                    : "0 Jiwa"}
                </Text>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
        <Card radius={"md"} shadow="md">
          <Table fz={13} horizontalSpacing="xl" verticalSpacing="md">
            <TableTbody>
              {Object.entries(borders).map(([k, v]) => (
                <TableTr key={k}>
                  <TableTd fw={"bold"}>{k}</TableTd>
                  <TableTd> {v == "" ? "-" : v}</TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </Card>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack gap={50} visibleFrom="sm">
        <Box>
          <Title tt={"uppercase"} fz={44} c={vars("color-primary-4")}>
            PETA LOKASI {aliasDesa}
          </Title>
          <Text fz={20}>Peta Lokasi {`${aliasDesa} ${namaDesa}`}</Text>
        </Box>
        <Grid style={{ overflow: "visible" }}>
          <Grid.Col span={6}>
            <Paper p={15} radius="md" shadow="xs">
              <Stack gap={10}>
                <Title size={32} fw={600}>
                  {aliasDesa} {namaDesa}
                </Title>
                <Divider size={"sm"} />
                <Box>
                  <Title size={22} fw={400} c={vars("color-dimmed")}>
                    Batas {aliasDesa}
                  </Title>
                  <Space h={"md"} />
                  <Grid>
                    {Object.entries(borders).map(([key, value]) => (
                      <Grid.Col span={6} key={key}>
                        <Title size={24} fw={500}>
                          {key}
                        </Title>
                        <Text fz={24} fw={400}>
                          {value == null || value == "" ? "-" : value}
                        </Text>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
                <Divider size={"sm"} />
                <Grid>
                  <Grid.Col span={6}>
                    <Title size={22} fw={400} c={vars("color-dimmed")}>
                      Luas {aliasDesa}
                    </Title>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text fz={24} fw={400}>
                      {clientProfile?.area !== undefined
                        ? FormattedNumber.format(clientProfile.area) + " ㎡"
                        : "0 ㎡"}
                    </Text>
                  </Grid.Col>
                </Grid>
                <Divider size={"sm"} />
                <Grid>
                  <Grid.Col span={6}>
                    <Title size={22} fw={400} c={vars("color-dimmed")}>
                      Jumlah Penduduk
                    </Title>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text fz={24} fw={400}>
                      {stats?.total !== undefined
                        ? FormattedNumber.format(
                            int(stats.total) -
                              int(
                                mutationOut
                                  .map((v: { value: any }) => v.value)
                                  .reduce((a: any, b: any) => a + b),
                              ),
                          ) + " Jiwa"
                        : "0 Jiwa"}
                    </Text>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <BorderVillage />
          </Grid.Col>
        </Grid>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default PetaLokasi
