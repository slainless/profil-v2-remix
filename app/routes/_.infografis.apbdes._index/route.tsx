import { Stack, Box } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import { BudgetStatsByYear } from "Components/Infography/APBDes/BudgetStatsByYear.tsx"
import Expense from "Components/Infography/APBDes/ExpenseChart.tsx"
import ExpenseDetails from "Components/Infography/APBDes/ExpenseDetails.tsx"
import Financing from "Components/Infography/APBDes/FinancingChart.tsx"
import FinancingDetails from "Components/Infography/APBDes/FinancingDetails.tsx"
import Income from "Components/Infography/APBDes/IncomeChart.tsx"
import IncomeDetails from "Components/Infography/APBDes/IncomeDetails.tsx"
import IncomeExpense from "Components/Infography/APBDes/IncomeExpenseChart.tsx"

import { APBDReportLoader } from "Providers/APBD.ts"

import { renderMetadata } from "../_.infografis/meta.ts"

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "apbdes")
}

export default function APBDes() {
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
