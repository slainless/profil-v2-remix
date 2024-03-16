import { Box, Stack } from "@mantine/core"

import { APBDReportLoader } from "#providers/APBD.ts"

import { BudgetStatsByYear } from "./BudgetStatsByYear.tsx"
import Expense from "./ExpenseChart.tsx"
import ExpenseDetails from "./ExpenseDetails.tsx"
import Financing from "./FinancingChart.tsx"
import FinancingDetails from "./FinancingDetails.tsx"
import Income from "./IncomeChart.tsx"
import IncomeDetails from "./IncomeDetails.tsx"
import IncomeExpense from "./IncomeExpenseChart.tsx"

export const APBDView = () => {
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
