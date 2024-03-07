/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Box, Stack, Text, Title } from "@mantine/core"
import ReactECharts, { EChartsOption } from "echarts-for-react"
import { useAtomValue } from "jotai"
import { Fragment, useMemo } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { populationStatisticAtom } from "Providers/population.ts"

import type { IntKv } from "GraphQL/graphql.ts"

/* eslint-disable @typescript-eslint/no-explicit-any */

const ABSOLUTE_BOUND_LIMIT = 50
const MIN_ABSOLUTE_BOUND_LIMIT = 10
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMaxBound = (value: any) => {
  const max = Math.max(Math.abs(value.min), Math.abs(value.max))
  if (max > ABSOLUTE_BOUND_LIMIT) {
    return max + (ABSOLUTE_BOUND_LIMIT - (max % ABSOLUTE_BOUND_LIMIT))
  }

  return max + (MIN_ABSOLUTE_BOUND_LIMIT - (max % MIN_ABSOLUTE_BOUND_LIMIT))
}

const int = (i: IntKv) =>
  parseInt(i.name.replace("+", "").split("-").shift() ?? "0")
const percent = (v?: number, of?: number, fixed = 2) => {
  if (of == null || v == null || of === 0 || v === 0) return 0
  return ((v / of) * 100).toFixed(fixed)
}
const sort = (a: IntKv, b: IntKv) => int(b) - int(a)
const update = (i: IntKv, max: IntKv[], min: IntKv[]) => {
  if (max.length < 1) max.push(i)
  if (min.length < 1) min.push(i)

  if (i.value > max[0].value) {
    max.splice(0)
    max.push(i)
  }
  if (i.value == max[0].value && max[0] !== i) {
    max.push(i)
  }
  if (i.value < min[0].value) {
    min.splice(0)
    min.push(i)
  }
  if (i.value == min[0].value && min[0] !== i) {
    min.push(i)
  }
}

const formatUmur = (a: IntKv[]) => {
  const len = a.length
  return a
    .slice(0, 3)
    .map((v, i) => {
      if (len == 1) return v.name
      if (len > 1) {
        if (len > 3) {
          if (i == 2) return v.name + " tahun dst."
          return v.name + ","
        }

        if (i == len - 1) return v.name + " tahun"
        if (i == len - 2) return v.name + " dan"
        return v.name + ","
      }
    })
    .join(" ")
}

const SummaryText = (props: {
  total: number
  max: IntKv[]
  min: IntKv[]
  gender: "M" | "F"
}) => {
  return (
    <Fragment>
      Untuk jenis kelamin {props.gender == "F" ? "perempuan" : "laki-laki"},
      kelompok umur <b>{formatUmur(props.max)}</b> adalah kelompok umur
      tertinggi dengan{" "}
      {props.max.length > 1 ? "masing-masing berjumlah" : "jumlah"}{" "}
      <b>{props.max[0].value} orang</b> atau{" "}
      <b>{percent(props.max[0].value, props?.total)}%</b>. Sedangkan, kelompok
      umur <b>{formatUmur(props.min)}</b> adalah yang terendah dengan{" "}
      {props.min.length > 1 ? "masing-masing berjumlah" : "jumlah"}{" "}
      <b>{props.min[0].value} orang</b> atau{" "}
      <b>{percent(props.min[0].value, props?.total)}%</b>
    </Fragment>
  )
}

const PopulationByAgeCategory = () => {
  const stats = useAtomValue(populationStatisticAtom)
  const [ranges, male, female, maxMale, maxFemale, minMale, minFemale] =
    useMemo(() => {
      const male = [...(stats?.maleAgeRanges ?? [])].sort(sort)
      const female = [...(stats?.femaleAgeRanges ?? [])].sort(sort)
      const ranges = male?.map((v) => v.name)

      const maxMale: IntKv[] = []
      const maxFemale: IntKv[] = []
      const minMale: IntKv[] = []
      const minFemale: IntKv[] = []
      for (const i in male) {
        update(male[+i], maxMale, minMale)
        update(female![+i], maxFemale, minFemale)
      }

      return [ranges, male, female, maxMale, maxFemale, minMale, minFemale]
    }, [stats])

  const barColors = ["#6DAB97", "#FFB9A1"]

  const chartOptions: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      valueFormatter: (value: number) => Math.abs(value),
    },
    legend: {
      show: true,
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
        type: "value",
        // splitLine: { show: false },
        axisLabel: { formatter: (value: number) => Math.abs(value) },
        max: getMaxBound,
        min: (value: any) => getMaxBound(value) * -1,
      },
    ],
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: { interval: 0 },
        min: 0,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: true, lineStyle: { type: "solid" } },
        boundaryGap: true,
        data: ranges,
      },
    ],
    series: [
      {
        name: "Laki-Laki",
        type: "bar",
        stack: "Total",
        itemStyle: { borderRadius: [5, 0, 0, 5], color: barColors[0] },
        label: {
          show: true,
          position: "left",
          formatter: ({ data }: any) => Math.abs(data.value),
        },
        data: male?.map((v) => ({ ...v, value: v.value * -1 })),
      },
      {
        name: "Perempuan",
        type: "bar",
        stack: "Total",
        itemStyle: { borderRadius: [0, 5, 5, 0], color: barColors[1] },
        label: { show: true, position: "right" },
        data: female,
      },
    ],
  }

  const chartOptionsMobile: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      valueFormatter: (value: number) => Math.abs(value),
    },
    legend: {
      show: true,
      icon: "roundRect",
      bottom: 0,
      textStyle: { fontSize: 12, fontWeight: "normal" },
    },
    grid: {
      top: 20,
      right: 30,
      bottom: 30,
      left: 5,
      // height: 700,
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        axisLabel: { show: true, fontSize: 10, interval: 0 },
        axisTick: {
          show: false,
        },
        position: "bottom",
        min: (value: { min: number }) => value.min,
        max: (value: { max: number }) => value.max,
        // interval: true,
        splitLine: { show: false },
        showMinLabel: true,
        showMaxLabel: true,
        hideOverlap: true,
      },
    ],
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: { show: true, fontSize: 10, interval: 0 },
        min: 0,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: true, lineStyle: { type: "solid" } },
        boundaryGap: true,
        data: ranges,
      },
    ],
    series: [
      {
        name: "Laki-Laki",
        type: "bar",
        // stack: "Total",
        // barWidth: 15,
        itemStyle: { borderRadius: [0, 5, 5, 0], color: barColors[0] },
        label: {
          show: true,
          position: "right",
          fontSize: 10,
        },
        data: male,
      },
      {
        name: "Perempuan",
        type: "bar",
        // stack: "Total",
        // barWidth: 15,
        itemStyle: { borderRadius: [0, 5, 5, 0], color: barColors[1] },
        label: { show: true, position: "right", fontSize: 10 },
        data: female,
      },
    ],
    dataZoom: [
      {
        type: "inside",
        id: "insideY",
        yAxisIndex: 0,
        startValue: 90,
        endValue: 100,
        filterMode: "empty",
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true,
      },
    ],
  }

  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Box
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "5px",
            backdropFilter: "blur(2px)",
          }}
          py={"lg"}
        >
          <Title
            fz={{ base: 20, sm: 44 }}
            ta={{ base: "center", sm: "start", md: "start" }}
            c={vars("color-primary-4")}
          >
            BERDASARKAN KELOMPOK UMUR
          </Title>
          <ReactECharts
            option={chartOptionsMobile}
            style={{ width: "100%", height: "450px" }}
          />
        </Box>
        <Box
          p={"lg"}
          ta={"left"}
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            backdropFilter: "blur(2px)",
            borderBottom: "5px solid #6DAB97",
          }}
        >
          <Text fz={{ base: 14, sm: 18 }}>
            {male?.length ?? 0 > 0 ? (
              <SummaryText
                max={maxMale}
                min={minMale}
                total={stats?.male ?? 0}
                gender="M"
              />
            ) : (
              <>Sedang Menghitung...</>
            )}
          </Text>
        </Box>
        <Box
          p={"lg"}
          ta={"left"}
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            backdropFilter: "blur(2px)",
            borderBottom: "5px solid #FFB9A1",
          }}
        >
          <Text fz={{ base: 14, sm: 18 }}>
            {female?.length ?? 0 > 0 ? (
              <SummaryText
                max={maxFemale}
                min={minFemale}
                total={stats?.female ?? 0}
                gender="F"
              />
            ) : (
              <>Sedang Menghitung...</>
            )}
          </Text>
        </Box>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack visibleFrom="sm">
        <Title
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-4")}
        >
          Berdasarkan Kelompok Umur
        </Title>
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
          <ReactECharts
            option={chartOptions}
            style={{ width: "100%", height: "500px" }}
          />
        </Box>
        <Box
          p={"lg"}
          ta={"left"}
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            backdropFilter: "blur(2px)",
            borderBottom: "5px solid #6DAB97",
          }}
        >
          <Text fz={{ base: "md", sm: 18 }}>
            {male?.length ?? 0 > 0 ? (
              <SummaryText
                max={maxMale}
                min={minMale}
                total={stats?.male ?? 0}
                gender="M"
              />
            ) : (
              <>Sedang Menghitung...</>
            )}
          </Text>
        </Box>
        <Box
          p={"lg"}
          ta={"left"}
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            backdropFilter: "blur(2px)",
            borderBottom: "5px solid #FFB9A1",
          }}
        >
          <Text fz={{ base: "md", sm: 18 }}>
            {male?.length ?? 0 > 0 ? (
              <SummaryText
                max={maxFemale}
                min={minFemale}
                total={stats?.female ?? 0}
                gender="F"
              />
            ) : (
              <>Sedang Menghitung...</>
            )}
          </Text>
        </Box>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default PopulationByAgeCategory
