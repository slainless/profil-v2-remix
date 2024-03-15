"use client"

import { Box, Grid, Stack, Title, Text, Card, Group } from "@mantine/core"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { latestIDMAtom } from "#providers/IDM.ts"

function IdmSummary() {
  const latestIDM = useAtomValue(latestIDMAtom)
  const year = latestIDM?.SUMMARIES.TAHUN
  const [IKS, IKE, IKL] = useMemo(() => {
    if (latestIDM == null) return ["-", "-", "-"]
    return [
      latestIDM.ROW.find((v) => v.INDIKATOR.startsWith("IKS"))?.SKOR.toFixed(4),
      latestIDM.ROW.find((v) => v.INDIKATOR.startsWith("IKE"))?.SKOR.toFixed(4),
      latestIDM.ROW.find((v) => v.INDIKATOR.startsWith("IKL"))?.SKOR.toFixed(4),
    ]
  }, [latestIDM])

  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Skor IDM {year}</Title>
            <Text fz={24} fw={700}>
              {latestIDM?.SUMMARIES.SKOR_SAAT_INI.toFixed(4)}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>STATUS IDM {year}</Title>
            <Text fz={24} fw={700}>
              {latestIDM?.SUMMARIES.STATUS}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Target Status</Title>
            <Text fz={24} fw={700}>
              {latestIDM?.SUMMARIES.TARGET_STATUS}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Skor Minimal</Title>
            <Text fz={24} fw={700}>
              {latestIDM?.SUMMARIES.SKOR_MINIMAL}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Penambahan</Title>
            <Text fz={24} fw={700}>
              {latestIDM?.SUMMARIES.PENAMBAHAN.toFixed(4)}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Skor IKS</Title>
            <Text fz={24} fw={700}>
              {IKS}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Skor IKE</Title>
            <Text fz={24} fw={700}>
              {IKE}
            </Text>
          </Group>
        </Card>
        <Card shadow="md" radius={"md"}>
          <Group justify="space-between" align="center">
            <Title fz={12}>Skor IKL</Title>
            <Text fz={24} fw={700}>
              {IKL}
            </Text>
          </Group>
        </Card>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack gap={50} visibleFrom="sm">
        <Grid
          justify="center"
          align="center"
          gutter={150}
          grow
          style={{ overflow: "visible" }}
        >
          <Grid.Col span={6}>
            <Title size={38} order={1} c={vars("color-primary-4")}>
              IDM
            </Title>
            <Text fz={20}>
              Indeks Desa Membangun (IDM) merupakan indeks komposit yang
              dibentuk dari tiga indeks, yaitu Indeks Ketahanan Sosial, Indeks
              Ketahanan Ekonomi, dan Indeks Ketahanan Ekologi/Lingkungan.
            </Text>
          </Grid.Col>
          <Grid.Col span={6} style={{ overflow: "visible" }}>
            <Stack>
              <Grid grow style={{ overflow: "visible" }}>
                <Grid.Col span={12}>
                  <Stack>
                    <Box
                      bg={"rgba(255, 255, 255, 0.50)"}
                      style={{
                        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                        borderRadius: "5px",
                        backdropFilter: "blur(2px)",
                      }}
                      py={"sm"}
                      px={"xl"}
                    >
                      <Stack gap={0}>
                        <Text c={"#5A5E62"} fz={18} fw={600}>
                          SKOR IDM {year}
                        </Text>
                        <Text c={"#5A5E62"} ta="right" fz={44} fw={800}>
                          {latestIDM?.SUMMARIES.SKOR_SAAT_INI.toFixed(4)}
                        </Text>
                      </Stack>
                    </Box>
                    <Box
                      bg={"rgba(255, 255, 255, 0.50)"}
                      style={{
                        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                        borderRadius: "5px",
                        backdropFilter: "blur(2px)",
                      }}
                      py={"sm"}
                      px={"xl"}
                    >
                      <Stack gap={0}>
                        <Text c={"#5A5E62"} fz={18} fw={600}>
                          STATUS IDM {year}
                        </Text>
                        <Text c={"#5A5E62"} ta="right" fz={44} fw={800}>
                          {latestIDM?.SUMMARIES.STATUS}
                        </Text>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid style={{ overflow: "visible" }}>
          <Grid.Col span={4}>
            <Box
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Stack gap={0}>
                <Text c={"#5A5E62"} fz={18} fw={600}>
                  Target Status
                </Text>
                <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
                  {latestIDM?.SUMMARIES.TARGET_STATUS}
                </Text>
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Stack gap={0}>
                <Text c={"#5A5E62"} fz={18} fw={600}>
                  Skor Minimal
                </Text>
                <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
                  {latestIDM?.SUMMARIES.SKOR_MINIMAL}
                </Text>
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Stack gap={0}>
                <Text c={"#5A5E62"} fz={18} fw={600}>
                  Penambahan
                </Text>
                <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
                  {latestIDM?.SUMMARIES.PENAMBAHAN.toFixed(4)}
                </Text>
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Stack gap={0}>
                <Text c={"#5A5E62"} fz={18} fw={600}>
                  Skor IKS
                </Text>
                <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
                  {IKS}
                </Text>
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Stack gap={0}>
                <Text c={"#5A5E62"} fz={18} fw={600}>
                  Skor IKE
                </Text>
                <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
                  {IKE}
                </Text>
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={4}>
            <Box
              bg={"rgba(255, 255, 255, 0.50)"}
              style={{
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                borderRadius: "5px",
                backdropFilter: "blur(2px)",
              }}
              py={"sm"}
              px={"xl"}
            >
              <Stack gap={0}>
                <Text c={"#5A5E62"} fz={18} fw={600}>
                  Skor IKL
                </Text>
                <Text c={"#5A5E62"} ta="right" fz={32} fw={800}>
                  {IKL}
                </Text>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default IdmSummary
