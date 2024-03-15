import { Card, SimpleGrid, Box, Text } from "@mantine/core"

import { vars } from "#theme/artifact/vars.mjs"

import { normalizeBudget, getState, BudgetItem } from "./BudgetItemCard.tsx"
import styles from "./FinancingCard.module.css"

export const FinancingCard = ({
  expense,
  income,
}: {
  expense: number
  income: number
}) => {
  const [exp, inc] = [normalizeBudget(expense), normalizeBudget(income)]
  const [expenseState, incomeState] = [getState(-exp), getState(inc)] as const

  return (
    <Card withBorder shadow="xs" p={0} c={vars("color-text-dark-3")}>
      <Text
        fz={18}
        fw={600}
        px="md"
        py="sm"
        style={{
          borderBottom: `1px solid ${vars("color-default-border")}`,
        }}
      >
        Pembiayaan
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={0}>
        <Box p="sm" className={styles.content}>
          <BudgetItem.Title state={incomeState}>Penerimaan</BudgetItem.Title>
          <BudgetItem.Value state={incomeState} budget={inc} />
        </Box>
        <Box p="sm">
          <BudgetItem.Title state={expenseState}>Pengeluaran</BudgetItem.Title>
          <BudgetItem.Value state={expenseState} budget={-exp} stripSign />
        </Box>
      </SimpleGrid>
    </Card>
  )
}
