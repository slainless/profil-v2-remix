"use client"

import { Box, Stack, Accordion } from "@mantine/core"
import { IconListDetails } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import {
  APBDReportByTypeInCurrentYearAtom,
  currentYearAtom,
} from "#providers/APBD.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

import { APBDReportAccordionItem } from "./APBDReportAccordionItem.tsx"

const FinancingDetails = () => {
  const currentYear = useAtomValue(currentYearAtom)

  const types = useAtomValue(APBDReportByTypeInCurrentYearAtom)
  const reports = useMemo(() => {
    return [
      ...Object.values(types?.FINANCING_INCOME.reports ?? {}),
      ...Object.values(types?.FINANCING_EXPENSE.reports ?? {}),
    ]
  }, [types])
  const financing = useMemo(() => {
    if (types == null) return 0
    return types.FINANCING_INCOME.total + types.FINANCING_EXPENSE.total
  }, [types])

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
                financing === 0
                  ? "0"
                  : ((report.total / financing) * 100).toFixed(2)
              }
              color={vars("color-primary-9")}
            />
          ))}
        </Accordion>
      </Box>
      <Box visibleFrom="sm" display={contentsOrNone(reports.length <= 0)}>
        <DimmedNotice
          icon={IconListDetails}
          message={`Belum ada data rincian pembiayaan${
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

export default FinancingDetails
