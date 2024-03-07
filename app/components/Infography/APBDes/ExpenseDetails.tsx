"use client"

import { Box, Stack } from "@mantine/core"
import { Accordion } from "@mantine/core"
import { IconListDetails } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice.tsx"

import {
  APBDReportByTypeInCurrentYearAtom,
  currentYearAtom,
} from "Providers/APBD.ts"

import { contentsOrNone } from "Modules/css-utils.ts"

import { APBDReportAccordionItem } from "./APBDReportAccordionItem.tsx"

const ExpenseDetails = () => {
  const currentYear = useAtomValue(currentYearAtom)

  const types = useAtomValue(APBDReportByTypeInCurrentYearAtom)
  const expense = useMemo(
    () => Object.values(types?.EXPENSE.reports ?? {}),
    [types],
  )

  return (
    <Stack>
      <Box display={contentsOrNone(expense.length > 0)}>
        <Accordion variant="separated" radius="md">
          {expense.map((report) => {
            const budget = parseInt(report.budget)
            const percent =
              isNaN(budget) || budget === 0
                ? "0"
                : ((report.total / parseInt(report.budget)) * 100).toFixed(2)
            return (
              <APBDReportAccordionItem
                key={report.category.name}
                category={report.category.name}
                color={vars("color-primary-3")}
                value={report.total}
                percent={percent}
                reports={report}
              />
            )
          })}
        </Accordion>
      </Box>
      <Box visibleFrom="sm" display={contentsOrNone(expense.length <= 0)}>
        <DimmedNotice
          icon={IconListDetails}
          message={`Belum ada data rincian belanja${
            currentYear != null ? " untuk tahun " + currentYear : ""
          }`}
        />
      </Box>
      <Box hiddenFrom="sm" display={contentsOrNone(expense.length <= 0)}>
        <DimmedNotice icon={IconListDetails} message={"Belum Ada Data"} />
      </Box>
    </Stack>
  )
}

export default ExpenseDetails
