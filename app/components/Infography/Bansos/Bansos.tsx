"use client"

import { PieChart3D, PieSeries3D } from "@amcharts/amcharts4/charts"
import {
  useTheme as amchartsUseTheme,
  create,
  options,
  percent,
} from "@amcharts/amcharts4/core"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import { Stack, Box, Grid, Text, Title } from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import { useMemo, useEffect } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import { bansosQuery } from "#queries/bansos.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

amchartsUseTheme(am4themes_animated)

const Card = ({ name, value }: { name: string; value: number }) => {
  return (
    <Grid.Col span={6}>
      <Grid
        p={20}
        align="center"
        gutter={1}
        bg={"rgba(255, 255, 255, 0.50)"}
        style={{
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "5px",
          backdropFilter: "blur(2px)",
        }}
      >
        <Grid.Col span={4}>
          <Stack gap={0} align="center">
            <Text fz={44} fw={800} style={{ lineHeight: 1 }}>
              {value}
            </Text>
            <Text fz={20}>Penduduk</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text c="#545454" fz={20} fw={500} ta="start">
            mendapatkan bantuan
            <br />
            <span style={{ fontWeight: 800 }}>{name}</span>
          </Text>
        </Grid.Col>
      </Grid>
    </Grid.Col>
  )
}

const Bansos = () => {
  const [{ data }] = useQuery({ query: bansosQuery })
  const bansos = useMemo(
    () =>
      [...(data?.bansosStatistic.total ?? [])].sort(
        (a, b) => b.value - a.value,
      ),
    [data],
  )

  useEffect(() => {
    // Create the chart
    const chart = create("bansosChart", PieChart3D)
    chart.hiddenState.properties.opacity = 0 // Initial fade-in
    options.commercialLicense = true

    chart.data = bansos || []

    chart.radius = percent(90)
    chart.innerRadius = percent(20)

    const series = chart.series.push(new PieSeries3D())
    series.dataFields.value = "value"
    series.dataFields.category = "name"
    series.depth = 10

    series.labels.template.disabled = false
    series.ticks.template.disabled = false

    // Create custom labels to display on both sides
    series.labels.template.text = "{category}: {value}"
    series.labels.template.wrap = true
    series.labels.template.maxWidth = 100
    series.labels.template.fontSize = 12

    // Clean up when the component unmounts
    return () => {
      chart.dispose()
    }
  }, [bansos])

  return (
    <>
      {/* Mobile */}
      <Box w={"100%"} id="bansosChart" hiddenFrom="sm" />
      {/* End Mobile */}

      {/* Desktop */}
      <Stack
        visibleFrom="sm"
        display={contentsOrNone(bansos != null && bansos?.length > 0)}
      >
        <Box>
          <Title fz={38} c={vars("color-primary-4")}>
            Jumlah Penerima Bansos
          </Title>
        </Box>
        <Grid style={{ overflow: "visible" }}>
          {bansos?.map((i) => (
            <Card name={i.name} value={i.value} key={i.name + i.value} />
          ))}
        </Grid>
      </Stack>
      <Box display={contentsOrNone(bansos?.length == 0)}>
        <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
      </Box>
      {/* End Desktop */}
    </>
  )
}

export default Bansos
