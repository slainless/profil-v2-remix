import { Stack, Box } from "@mantine/core"
import type { LoaderFunctionArgs } from "@remix-run/node"
import type { MetaFunction } from "@remix-run/react"

import { BudgetStatsByYear } from "#components/Infography/APBDes/BudgetStatsByYear.tsx"
import Expense from "#components/Infography/APBDes/ExpenseChart.tsx"
import ExpenseDetails from "#components/Infography/APBDes/ExpenseDetails.tsx"
import Financing from "#components/Infography/APBDes/FinancingChart.tsx"
import FinancingDetails from "#components/Infography/APBDes/FinancingDetails.tsx"
import Income from "#components/Infography/APBDes/IncomeChart.tsx"
import IncomeDetails from "#components/Infography/APBDes/IncomeDetails.tsx"
import IncomeExpense from "#components/Infography/APBDes/IncomeExpenseChart.tsx"

import { APBDReportLoader } from "#providers/APBD.ts"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderMetadata } from "../_.infografis/meta.ts"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/infografis/anggaran")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "anggaran")
}

export default function Anggaran() {
  return (
    <Stack gap={100}>
      <APBDReportLoader />
      <BudgetStatsByYear />
      <Box mt={{ base: -65, sm: 0 }}>
        <IncomeExpense />
      </Box>
      <Stack gap={30}>
        <Income />
        <IncomeDetails />
      </Stack>
      <Stack gap={30}>
        <Expense />
        <ExpenseDetails />
      </Stack>
      <Stack gap={30}>
        <Financing />
        <FinancingDetails />
      </Stack>
    </Stack>
  )
}
