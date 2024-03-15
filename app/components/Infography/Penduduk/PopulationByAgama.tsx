"use client"

import { Stack, Box, Grid, Text, Title, Image } from "@mantine/core"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { populationStatisticAtom } from "#providers/population.ts"

import Buddha from "#assets/icons/icon-buddha.svg"
import Hindu from "#assets/icons/icon-hindu.svg"
import Islam from "#assets/icons/icon-islam.svg"
import Katolik from "#assets/icons/icon-katolik.svg"
import Lainnya from "#assets/icons/icon-kepercayaan-lainnya.svg"
import Konghuchu from "#assets/icons/icon-konghuchu.svg"
import Kristen from "#assets/icons/icon-kristen.svg"

import { FormattedNumber } from "#modules/intl.ts"

const getIcon = (name: string) => {
  switch (name) {
    case "Islam":
      return Islam
    case "Katolik":
      return Katolik
    case "Kepercayaan lainnya":
      return Lainnya
    case "Konghucu":
      return Konghuchu
    case "Kristen":
      return Kristen
    case "Hindu":
      return Hindu
    case "Buddha":
      return Buddha
  }

  return ""
}

const Card = ({ name, value }: { name: string; value: number }) => {
  return (
    <Grid.Col span={4}>
      <Grid
        align="center"
        gutter={1}
        bg={"rgba(255, 255, 255, 0.50)"}
        style={{
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "5px",
          backdropFilter: "blur(2px)",
        }}
        h={150}
      >
        <Grid.Col p={20} span={4}>
          <Stack gap={0} align="center">
            <Image maw={100} src={getIcon(name)} alt={name} />
          </Stack>
        </Grid.Col>
        <Grid.Col p={10} span={8}>
          <Stack gap={0} align="start" fw={700} style={{ color: "#5A5E62" }}>
            <Text fz={24}>{name}</Text>
            <Text fz={32}>
              <span style={{ color: vars("color-primary-4") }}>
                {FormattedNumber.format(value)}
              </span>
            </Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Grid.Col>
  )
}

const PopulationByAgama = () => {
  const stats = useAtomValue(populationStatisticAtom)
  const sorted = useMemo(
    () => [...(stats?.religion ?? [])].sort((a, b) => b.value - a.value),
    [stats],
  )
  return (
    <>
      <Stack visibleFrom="sm">
        <Box>
          <Title size={38} order={1} c={vars("color-primary-4")}>
            Berdasarkan Agama
          </Title>
        </Box>
        <Grid
          justify="center"
          align="flex-start"
          style={{ overflow: "visible" }}
        >
          {sorted?.map((i) => (
            <Card name={i.name} value={i.value} key={i.name + i.value} />
          ))}
        </Grid>
      </Stack>
    </>
  )
}

export default PopulationByAgama
