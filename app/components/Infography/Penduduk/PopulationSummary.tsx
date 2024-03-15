"use client"

import { Stack, Box, Grid, Text, Title, Image, SimpleGrid } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"

import { populationStatisticAtom } from "#providers/population.ts"

import KK from "#assets/icons/icon-kepala-keluarga.svg"
import Laki from "#assets/icons/icon-laki.svg"
import Perempuan from "#assets/icons/icon-perempuan.svg"
import TotalPenduduk from "#assets/icons/icon-total-penduduk.svg"
import kk from "#assets/kepala-keluarga.png"
import laki from "#assets/laki.png"
import perempuan from "#assets/perempuan.png"
import total from "#assets/total-penduduk.png"

import { FormattedNumber } from "#modules/intl.ts"

const int = (v: number | null | undefined) => (v == null ? 0 : v)

const PopulationSummary = () => {
  const stats = useAtomValue(populationStatisticAtom)
  const mutationOut =
    stats?.mutationOut == null || stats.mutationOut.length == 0
      ? [{ value: 0 }]
      : stats.mutationOut
  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm" gap={"xl"}>
        <Title
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-4")}
        >
          JUMLAH PENDUDUK
        </Title>
        <SimpleGrid ta={"center"} cols={2}>
          <Stack align="center" gap={0}>
            <Image w={50} src={total} alt="other" />
            <Title fz={20}>
              {stats?.total !== undefined
                ? FormattedNumber.format(
                    int(stats.total) -
                      int(
                        mutationOut.map((v) => v.value).reduce((a, b) => a + b),
                      ),
                  )
                : "0"}
            </Title>
            <Text fz={14}>Penduduk</Text>
          </Stack>
          <Stack align="center" gap={0}>
            <Image w={50} src={kk} alt="other" />
            <Title fz={20}>
              {stats?.statusInFamily.find((v) => v.name === "Kepala Keluarga")
                ?.value !== undefined
                ? FormattedNumber.format(
                    stats.statusInFamily.find(
                      (v) => v.name === "Kepala Keluarga",
                    )?.value || 0,
                  )
                : "0"}
            </Title>
            <Text fz={14}>Kepala Keluarga</Text>
          </Stack>
          <Stack align="center" gap={0}>
            <Image w={50} src={laki} alt="other" />
            <Title fz={20}>
              {" "}
              {stats?.male !== undefined
                ? FormattedNumber.format(stats.male)
                : "0"}
            </Title>
            <Text fz={14}>Laki-Laki</Text>
          </Stack>
          <Stack align="center" gap={0}>
            <Image w={50} src={perempuan} alt="other" />
            <Title fz={20}>
              {" "}
              {stats?.female !== undefined
                ? FormattedNumber.format(stats.female)
                : "0"}
            </Title>
            <Text fz={14}>Perempuan</Text>
          </Stack>
        </SimpleGrid>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack visibleFrom="sm">
        <Box>
          <Title size={38} order={1} c={vars("color-primary-4")}>
            Jumlah Penduduk dan Kepala Keluarga
          </Title>
        </Box>
        <Grid style={{ overflow: "visible" }}>
          <Grid.Col span={6}>
            <Grid
              align="center"
              gutter={1}
              h={150}
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
            >
              <Grid.Col p={20} span={4}>
                <Stack gap={0} align="center">
                  <Image maw={100} src={TotalPenduduk} alt="Total Penduduk" />
                </Stack>
              </Grid.Col>
              <Grid.Col p={10} span={8}>
                <Stack
                  gap={0}
                  align="start"
                  fw={700}
                  style={{ color: "#5A5E62" }}
                >
                  <Text fz={24}>TOTAL PENDUDUK</Text>
                  <Text fz={32}>
                    <span style={{ color: vars("color-primary-4") }}>
                      {" "}
                      {stats?.total !== undefined
                        ? FormattedNumber.format(
                            int(stats.total) -
                              int(
                                mutationOut
                                  .map((v) => v.value)
                                  .reduce((a, b) => a + b),
                              ),
                          )
                        : "0"}
                    </span>{" "}
                    Jiwa
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6}>
            <Grid
              align="center"
              gutter={1}
              h={150}
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
            >
              <Grid.Col p={20} span={4}>
                <Stack gap={0} align="center">
                  <Image maw={100} src={KK} alt="Kepala Keluarga" />
                </Stack>
              </Grid.Col>
              <Grid.Col p={10} span={8}>
                <Stack
                  gap={0}
                  align="start"
                  fw={700}
                  style={{ color: "#5A5E62" }}
                >
                  <Text fz={24}>KEPALA KELUARGA</Text>
                  <Text fz={32}>
                    <span style={{ color: vars("color-primary-4") }}>
                      {stats?.statusInFamily.find(
                        (v) => v.name === "Kepala Keluarga",
                      )?.value !== undefined
                        ? FormattedNumber.format(
                            stats.statusInFamily.find(
                              (v) => v.name === "Kepala Keluarga",
                            )?.value || 0,
                          )
                        : "0"}
                    </span>{" "}
                    Jiwa
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6}>
            <Grid
              align="center"
              gutter={1}
              h={150}
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
            >
              <Grid.Col p={20} span={4}>
                <Stack gap={0} align="center">
                  <Image maw={100} src={Perempuan} alt="Perempuan" />
                </Stack>
              </Grid.Col>
              <Grid.Col p={10} span={8}>
                <Stack
                  gap={0}
                  align="start"
                  fw={700}
                  style={{ color: "#5A5E62" }}
                >
                  <Text fz={24}>PEREMPUAN</Text>
                  <Text fz={32}>
                    <span style={{ color: vars("color-primary-4") }}>
                      {" "}
                      {stats?.female !== undefined
                        ? FormattedNumber.format(stats.female)
                        : "0"}
                    </span>{" "}
                    Jiwa
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6}>
            <Grid
              align="center"
              gutter={1}
              h={150}
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
            >
              <Grid.Col p={20} span={4}>
                <Stack gap={0} align="center">
                  <Image maw={100} src={Laki} alt="Laki-Laki" />
                </Stack>
              </Grid.Col>
              <Grid.Col p={10} span={8}>
                <Stack
                  gap={0}
                  align="start"
                  fw={700}
                  style={{ color: "#5A5E62" }}
                >
                  <Text fz={24}>LAKI-LAKI</Text>
                  <Text fz={32}>
                    <span style={{ color: vars("color-primary-4") }}>
                      {" "}
                      {stats?.male !== undefined
                        ? FormattedNumber.format(stats.male)
                        : "0"}
                    </span>{" "}
                    Jiwa
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default PopulationSummary
