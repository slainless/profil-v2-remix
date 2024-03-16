/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Box, Stack, Title, useMantineTheme } from "@mantine/core"
import ReactEChartsCore from "echarts-for-react/lib/core"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { populationStatisticAtom } from "#providers/population.ts"

import { createSortByValue, sortByValue } from "#modules/array.ts"
import { echarts } from "#modules/echarts.js"
import { FormattedNumber } from "#modules/intl.ts"

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const order = createSortByValue([
  "Strata III",
  "Strata II",
  "Diploma IV/Strata I",
  "Diploma III/Sarjana Muda",
  "Diploma I/II",
  "SLTA/Sederajat",
  "SLTP/Sederajat",
  "Tamat SD/Sederajat",
  "Belum Tamat SD/Sederajat",
  "Tidak/Belum Sekolah",
])

const PopulationByPendidikan = () => {
  const stats = useAtomValue(populationStatisticAtom)
  const educationStats = useMemo(
    () => [...(stats?.education ?? [])].sort(sortByValue(order, (v) => v.name)),
    [stats],
  )

  const theme = useMantineTheme()
  const barColors = [theme.colors["primary"][9]]

  // const barColors = ["#B9E581", "#8EBCAD"]

  const chartOptions = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      valueFormatter: (value: number) => FormattedNumber.format(value),
    },
    legend: {
      show: false,
      icon: "none",
      itemGap: 100,
      textStyle: { fontSize: 14, fontWeight: "bold" },
    },
    grid: {
      top: 30,
      right: 20,
      bottom: 20,
      left: 20,
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        inverse: false,
        axisLabel: {
          interval: 0, // Display all labels
          // rotate: 45,
          textStyle: {
            fontSize: "12px",
            fontWeight: "normal",
          },
          formatter: function (value: any) {
            // Define a maximum width
            const maxWidth = 2 // Adjust this value as needed
            const lines = []
            let line = ""
            const words = value.split(" ")

            // Iterate through words and add them to lines
            words.forEach((word: any) => {
              if (line.length + word.length <= maxWidth) {
                line += (line ? " " : "") + word
              } else {
                lines.push(line)
                line = word
              }
            })

            // Push the last line
            if (line) {
              lines.push(line)
            }

            return lines.join("\n")
          },
        },
        min: 0,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        boundaryGap: true,
        data: educationStats?.map((v) => v.name),
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: { type: "solid" },
        },
      },
    ],
    series: [
      {
        type: "bar",
        stack: "Total",
        itemStyle: { color: barColors[0] },
        label: {
          show: true,
          position: "top",
          formatter: function (params: { value: number }) {
            return FormattedNumber.format(params.value)
          },
        },
        data: educationStats?.map((v) => v.value),
      },
    ],
  }

  return (
    <>
      <Stack visibleFrom="sm">
        <Title c={vars("color-primary-4")}>Berdasarkan Pendidikan</Title>
        <Box
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "5px",
            backdropFilter: "blur(2px)",
          }}
          py={"md"}
          px={"md"}
        >
          <ReactEChartsCore
            echarts={echarts}
            option={chartOptions}
            style={{ width: "100%", height: "500px" }}
          />
        </Box>
      </Stack>
    </>
  )
}

export default PopulationByPendidikan
