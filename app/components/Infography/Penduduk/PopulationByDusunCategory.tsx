/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Box, Group, Stack, Text, Title } from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import ReactEChartsCore from "echarts-for-react/lib/core"
import { useAtomValue } from "jotai"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import { populationStatisticAtom } from "#providers/population.ts"

import { contentsOrNone } from "#modules/css-utils.ts"
import { echarts } from "#modules/echarts.js"
import { FormattedNumber } from "#modules/intl.ts"

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

const PopulationByDusunCategory = () => {
  const stats = useAtomValue(populationStatisticAtom)

  const chartOptions = {
    tooltip: {
      trigger: "item",
      formatter: function (params: {
        name: any
        seriesName: any
        value: number | bigint
        percent: any
      }) {
        return `<b>${params.name} ${
          params.seriesName
        }: ${FormattedNumber.format(params.value)} Jiwa (${
          params.percent
        }%)</b>`
      },
    },
    series: [
      {
        name: "",
        type: "pie",
        data: stats?.dusun,
        width: "100%",
        height: "100%",
        radius: "90%",
        label: {
          show: true,
          formatter: "{b} : {d}%",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  }

  return (
    <>
      <Stack visibleFrom="sm">
        <Title c={vars("color-primary-4")}>Berdasarkan Dusun</Title>
        <Box
          display={contentsOrNone(
            stats?.dusun != null && stats?.dusun.length > 0,
          )}
        >
          <Group gap={"xs"}>
            <Box w={"50vw"}>
              <ReactEChartsCore
                echarts={echarts}
                option={chartOptions}
                style={{ width: "100%" }}
              />
            </Box>
            <Stack mt={-150} gap={0}>
              <Title size={20} ml={-20} mb={3}>
                Keterangan:
              </Title>
              {stats?.dusun?.map((item) => (
                <Text key={item.name}>{`${item.name} : ${FormattedNumber.format(
                  item.value,
                )} Jiwa`}</Text>
              ))}
            </Stack>
          </Group>
        </Box>
      </Stack>
      <Box
        visibleFrom="sm"
        display={contentsOrNone(
          stats?.dusun != null && stats?.dusun.length == 0,
        )}
      >
        <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
      </Box>
    </>
  )
}

export default PopulationByDusunCategory
