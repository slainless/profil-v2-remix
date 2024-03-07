"use client"

import { Box, Flex, Stack, Title, useMantineTheme } from "@mantine/core"
import { IconReportOff } from "@tabler/icons-react"
import ReactECharts from "echarts-for-react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice"

import {
  APBDReportByTypeInCurrentYearAtom,
  currentYearAtom,
} from "Providers/APBD"
import { aliasDesaAtom } from "Providers/profile"

import { contentsOrNone } from "Modules/css-utils"

import { chartOptions, chartOptionsMobile } from "./expenseChartOptions"

const Expense = () => {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const currentYear = useAtomValue(currentYearAtom)

  const types = useAtomValue(APBDReportByTypeInCurrentYearAtom)
  const expense = useMemo(
    () => Object.values(types?.EXPENSE.reports ?? {}),
    [types],
  )

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
              Belanja {aliasDesa} {currentYear}
            </Title>
            <Box display={contentsOrNone(expense.length > 0)}>
              <ReactECharts
                option={chartOptionsMobile(
                  expense.map((d) => d.total),
                  expense.map((d) => d.category.name),
                )}
                style={{ width: "100%", height: "350px" }}
              />
            </Box>
            <Box display={contentsOrNone(expense.length <= 0)}>
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
          Belanja {aliasDesa} {currentYear}
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
          <Box display={contentsOrNone(expense.length > 0)}>
            <ReactECharts
              option={chartOptions(
                expense.map((d) => d.category.name),
                expense.map((d) => d.total),
                [theme.colors["primary"][3]],
              )}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Box display={contentsOrNone(expense.length <= 0)}>
            <DimmedNotice
              icon={IconReportOff}
              message={`Belum ada data belanja${
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

export default Expense
