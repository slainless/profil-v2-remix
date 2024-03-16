"use client"

import { Box, Flex, Stack, Title, useMantineTheme } from "@mantine/core"
import { IconChartDots3 } from "@tabler/icons-react"
import ReactEChartsCore from "echarts-for-react/lib/core"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import { APBDReportByYearAndTypeAtom, Year } from "#providers/APBD.ts"
import { aliasDesaAtom } from "#providers/profile.ts"

import { contentsOrNone } from "#modules/css-utils.ts"
import { echarts } from "#modules/echarts.js"

import { chartOptions, chartOptionsMobile } from "./incomeExpenseChartOption.ts"

const IncomeExpense = () => {
  const reports = useAtomValue(APBDReportByYearAndTypeAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const reportsByYear = useMemo(() => {
    if (reports == null) return []
    return Object.keys(reports)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map((key) => ({ report: reports[key as Year], year: key }))
  }, [reports])
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
              Pendapatan dan Belanja {aliasDesa}
              <br />
              dari Tahun ke Tahun
            </Title>
            <Box display={contentsOrNone(reportsByYear.length > 0)}>
              <ReactEChartsCore
                echarts={echarts}
                option={chartOptionsMobile(
                  reportsByYear.map((v) => v.year),
                  reportsByYear.map((v) => v.report["INCOME"].total),
                  reportsByYear.map((v) => v.report["EXPENSE"].total),
                  [theme.colors["primary"][9], theme.colors["primary"][3]],
                )}
                style={{ width: "100%" }}
              />
            </Box>
            <Box display={contentsOrNone(reportsByYear.length === 0)}>
              <DimmedNotice icon={IconChartDots3} message="Belum Ada Data" />
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
          Pendapatan dan Belanja {aliasDesa} dari Tahun ke Tahun
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
          h="480px"
          justify="center"
          align="center"
        >
          <Box display={contentsOrNone(reportsByYear.length > 0)}>
            <ReactEChartsCore
              echarts={echarts}
              option={chartOptions(
                reportsByYear.map((v) => v.year),
                reportsByYear.map((v) => v.report["INCOME"].total),
                reportsByYear.map((v) => v.report["EXPENSE"].total),
                [theme.colors["primary"][9], theme.colors["primary"][3]],
              )}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box display={contentsOrNone(reportsByYear.length === 0)}>
            <DimmedNotice
              icon={IconChartDots3}
              message="Belum ada data pendapatan dan belanja"
            />
          </Box>
        </Flex>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

export default IncomeExpense
