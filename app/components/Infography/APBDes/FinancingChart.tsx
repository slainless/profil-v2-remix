"use client"

import { Box, Flex, Stack, Title, useMantineTheme } from "@mantine/core"
import { IconReportOff } from "@tabler/icons-react"
import ReactEChartsCore from "echarts-for-react/lib/core"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import {
  APBDReportByTypeInCurrentYearAtom,
  currentYearAtom,
} from "#providers/APBD.ts"
import { aliasDesaAtom } from "#providers/profile.ts"

import { contentsOrNone } from "#modules/css-utils.ts"
import { echarts } from "#modules/echarts.js"

import { chartOptions, chartOptionsMobile } from "./financingChartOptions.ts"

const Financing = () => {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const currentYear = useAtomValue(currentYearAtom)

  const types = useAtomValue(APBDReportByTypeInCurrentYearAtom)
  const financing = useMemo(() => {
    return [
      ...Object.values(types?.FINANCING_INCOME.reports ?? {}),
      ...Object.values(types?.FINANCING_EXPENSE.reports ?? {}),
    ]
  }, [types])

  const theme = useMantineTheme()

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
          <Stack>
            <Title
              fz={{ base: 20, sm: 44 }}
              ta={{ base: "center", sm: "start", md: "start" }}
              c={vars("color-primary-4")}
            >
              Pembiayaan {aliasDesa} {currentYear}
            </Title>
            <Box display={contentsOrNone(financing.length > 0)}>
              <ReactEChartsCore
                echarts={echarts}
                option={chartOptionsMobile(
                  financing.map((d) => d.total),
                  financing.map((d) => d.category.name),
                )}
                style={{ width: "100%", height: "350px" }}
              />
            </Box>
            <Box display={contentsOrNone(financing.length <= 0)}>
              <DimmedNotice icon={IconReportOff} message={"Belum Ada Data"} />
            </Box>
          </Stack>
        </Box>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Stack pos={"relative"} visibleFrom="sm">
        <Title
          pos={"absolute"}
          top={-25}
          left={20}
          c={vars("color-primary-4")}
          style={{ zIndex: 10 }}
        >
          Pembiayaan {aliasDesa} {currentYear}
        </Title>
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
          <Box display={contentsOrNone(financing.length > 0)}>
            <ReactEChartsCore
              echarts={echarts}
              option={chartOptions(
                financing.map((d) => d.category.name),
                financing.map((d) => d.total),
                [theme.colors["primary"][9]],
              )}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box display={contentsOrNone(financing.length <= 0)}>
            <DimmedNotice
              icon={IconReportOff}
              message={`Belum ada data pembiayaan${
                currentYear != null ? " untuk tahun " + currentYear : ""
              }`}
            />
          </Box>
        </Flex>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default Financing
