"use client"

import { Box, Flex, Stack, Title, useMantineTheme } from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import ReactECharts from "echarts-for-react"
import { useAtomValue } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice.tsx"

import { populationStatisticAtom } from "Providers/population.ts"

import { contentsOrNone } from "Modules/css-utils.ts"

import { chartOptions } from "./populationByWajibPilihChartOption.ts"

const PopulationByWajibPilih = () => {
  const statistic = useAtomValue(populationStatisticAtom)
  const theme = useMantineTheme()
  return (
    <>
      <Stack visibleFrom="sm">
        <Title c={vars("color-primary-4")}>Berdasarkan Wajib Pilih</Title>
        <Flex
          bg={"rgba(255, 255, 255, 0.50)"}
          style={{
            boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "5px",
            backdropFilter: "blur(2px)",
          }}
          py={"lg"}
          px={"xl"}
          justify={"center"}
          align={"center"}
          h="480px"
        >
          <Box
            display={contentsOrNone(
              statistic?.wajibPilih != null && statistic?.wajibPilih.length > 0,
            )}
          >
            <ReactECharts
              option={chartOptions(
                statistic?.wajibPilih.map((v) => v.name) ?? [],
                statistic?.wajibPilih.map((v) => v.value) ?? [],
                [theme.colors["primary"][9]],
              )}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Flex>
        <Box
          visibleFrom="sm"
          display={contentsOrNone(
            statistic?.wajibPilih != null && statistic?.wajibPilih.length === 0,
          )}
        >
          <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
        </Box>
      </Stack>
    </>
  )
}

export default PopulationByWajibPilih
