"use client"

import {
  Grid,
  Stack,
  Title,
  Text,
  Group,
  Select,
  Card,
  SimpleGrid,
  Flex,
} from "@mantine/core"
import { useAtom, useAtomValue } from "jotai"
import { useEffect, useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import {
  APBDReportByTypeInCurrentYearAtom,
  APBDReportByYearAndTypeAtom,
  currentYearAtom,
} from "#providers/APBD.ts"
import { desaAtom, profileAtom, schemaAtom } from "#providers/profile.ts"

import { DomainHandler } from "#modules/domain-handler.ts"
import { IDRFormatter } from "#modules/intl.ts"

import { BudgetItemCard, getColor, getState } from "./BudgetItemCard"
import { FinancingCard } from "./FinancingCard"

// const title = tag(
//   `{{= it.apb }} {{= it.desa }} {{= it.year ? "Tahun " + it.year : "" }}`,
//   ["apb", "desa", "year"],
// )

export function BudgetStatsByYear() {
  const schema = useAtomValue(schemaAtom)
  const profile = useAtomValue(profileAtom)
  const reports = useAtomValue(APBDReportByYearAndTypeAtom)
  const desa = useAtomValue(desaAtom)

  const [year, setYear] = useAtom(currentYearAtom)

  const years = useMemo(() => {
    if (reports == null) return []
    return Object.keys(reports)?.sort((a, b) => parseInt(b) - parseInt(a)) ?? []
  }, [reports])

  useEffect(() => {
    setYear(years[0] ?? null)
  }, [setYear, years])

  const currentReport = useAtomValue(APBDReportByTypeInCurrentYearAtom)
  const [income, expense, financingIncome, financingExpense] = useMemo(() => {
    if (currentReport == null) return [0, 0, 0, 0]
    return [
      currentReport.INCOME.total,
      currentReport.EXPENSE.total,
      currentReport.FINANCING_INCOME.total,
      currentReport.FINANCING_EXPENSE.total,
    ]
  }, [currentReport])

  return (
    <Grid justify="center" align="center" grow style={{ overflow: "visible" }}>
      <Grid.Col span={{ md: 5, lg: 5 }}>
        <Title fz={{ md: 32, lg: 38 }} order={1} c={vars("color-primary-4")}>
          {`${DomainHandler.isKelurahan(schema) ? "Anggaran" : "APB"} ${desa} ${year ? "Tahun " + year : ""}`.trim()}
        </Title>
        <Text fz={{ base: 18, lg: 20 }}>
          {profile.alias.desa} {profile.name.deskel}, Provinsi{" "}
          {profile.name.provinsi}
        </Text>
      </Grid.Col>
      <Grid.Col span={{ md: 7, lg: 7 }}>
        <Stack>
          <Flex w="100%" justify="flex-end">
            <Select
              size="lg"
              placeholder="Pilih Filter Tahun"
              data={years ?? []}
              value={year}
              onChange={setYear}
              allowDeselect={false}
              maw={400}
              style={{ flexGrow: 1 }}
            />
          </Flex>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <BudgetItemCard title={`Pendapatan`} value={income} />
            <BudgetItemCard title={`Belanja`} value={-expense} stripSign />
            {/* <Comp.BudgetItemCard
              title={`Pembiayaan Penerimaan`}
              value={financingIncome}
            />
            <Comp.BudgetItemCard
              title={`Pembiayaan Pengeluaran`}
              value={financingExpense}
              isExpense
            /> */}
          </SimpleGrid>
          <FinancingCard income={financingIncome} expense={financingExpense} />
          <Comp.TotalCard
            total={income + financingIncome - expense - financingExpense}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

namespace Comp {
  export const TotalCard = ({ total }: { total: number }) => {
    return (
      <Card withBorder shadow="sm">
        <Group justify="center" c={vars("color-text-dark-3")} gap="xs">
          <Text fz={18} fw={600} component="span">
            Surplus/Defisit
          </Text>
          <Text
            ta="right"
            fz={24}
            fw={800}
            component="span"
            c={getColor(getState(total))}
          >
            {IDRFormatter.formatNoSpace(total)}
          </Text>
        </Group>
      </Card>
    )
  }
}
