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

const IncomeDetails = () => {
  const currentYear = useAtomValue(currentYearAtom)

  const types = useAtomValue(APBDReportByTypeInCurrentYearAtom)
  const reports = useMemo(
    () => Object.values(types?.INCOME.reports ?? {}),
    [types],
  )
  const income = useMemo(() => types?.INCOME.total ?? 0, [types])

  return (
    <Stack>
      <Box display={contentsOrNone(reports.length > 0)}>
        <Accordion variant="separated" radius="md">
          {reports?.map((report) => (
            <APBDReportAccordionItem
              key={report.category.name}
              category={report.category.name}
              value={report.total}
              reports={report}
              percent={
                income === 0 ? "0" : ((report.total / income) * 100).toFixed(2)
              }
              color={vars("color-primary-9")}
            />
          ))}
        </Accordion>
      </Box>
      <Box visibleFrom="sm" display={contentsOrNone(reports.length <= 0)}>
        <DimmedNotice
          icon={IconListDetails}
          message={`Belum ada data rincian pendapatan${
            currentYear != null ? " untuk tahun " + currentYear : ""
          }`}
        />
      </Box>
      <Box hiddenFrom="sm" display={contentsOrNone(reports.length <= 0)}>
        <DimmedNotice icon={IconListDetails} message={"Belum Ada Data"} />
      </Box>
    </Stack>
  )
}

export default IncomeDetails
