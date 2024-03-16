"use client"

import { Box, Stack, Title } from "@mantine/core"
import ReactEChartsCore from "echarts-for-react/lib/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"

import { IDMsAtom } from "#providers/IDM.ts"

import { echarts } from "#modules/echarts.js"

import {
  chartOptions,
  chartOptionsMobile,
} from "./IDMScoreYearByYearChartOptions.ts"

const IdmScoreYearByYear = () => {
  const IDMs = useAtomValue(IDMsAtom)

  return (
    <Stack>
      <Title
        fz={{ base: 20, sm: 38 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-4")}
      >
        Skor IDM tahun ke tahun
      </Title>
      <Box
        visibleFrom="sm"
        bg={"rgba(255, 255, 255, 0.50)"}
        style={{
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "5px",
          backdropFilter: "blur(2px)",
        }}
      >
        <ReactEChartsCore
          echarts={echarts}
          option={chartOptions(IDMs)}
          style={{ width: "100%", height: "450px" }}
        />
      </Box>
      <Box
        hiddenFrom="sm"
        bg={"rgba(255, 255, 255, 0.50)"}
        style={{
          boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
          borderRadius: "5px",
          backdropFilter: "blur(2px)",
        }}
      >
        <ReactEChartsCore
          echarts={echarts}
          option={chartOptionsMobile(IDMs)}
          style={{ width: "100%" }}
        />
      </Box>
    </Stack>
  )
}

export default IdmScoreYearByYear
