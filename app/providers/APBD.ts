import { atom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { Opaque } from "type-fest"
import { useQuery } from "urql"

import {
  TransactionType,
  type Transaction,
  type TransactionCategory,
} from "#graphql/graphql.ts"

import { getAPBDesReportsWithCategoriesQuery } from "#queries/apdes.ts"

export type WithTotal<T> = T & { total: number }

/* -------------------------------------------------------------------------- */
/*                                  APBD Type                                 */
/* -------------------------------------------------------------------------- */

export interface Report
  extends Pick<Transaction, "details" | "year" | "budget"> {
  category: Pick<TransactionCategory, "ID">
}

/**
 * Will yield record of apbds by type, for example:
 *
 * ```json
 * {
 *   "EXPENSE": {
 *     "total": 2700000,
 *     "reports": [
 *       {
 *         "total": 1350000,
 *         "year": 2022,
 *         "budget": "1400000.00",
 *         "category": {
 *           "ID": 1,
 *           "name": "Penanggulangan Bencana, Keadaan Darurat, dan Keadaan Mendesak Desa"
 *         },
 *         "details": [
 *           { "name": "Darurat", "value": "1300000" },
 *           { "name": "Darurat #2", "value": "50000" }
 *         ]
 *       },
 *       {
 *         "total": 1350000,
 *         "year": 2023,
 *         "budget": "1370000.00",
 *         "category": {
 *           "ID": 1,
 *           "name": "Penyelenggaraan Pemerintahan Desa"
 *         },
 *         "details": [
 *           {
 *             "name": "Penyediaan Sarana Prasarana Pemerintahan Desa",
 *             "value": "1350000"
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * }
 * ```
 */
export type ReportByType = Record<
  TransactionType,
  WithTotal<{ reports: Record<number, WithTotal<Transaction>> }>
>

const categoryToTransaction = (year: number, category: TransactionCategory) =>
  ({
    category,
    budget: "0",
    details: [],
    total: 0,
    year,
    __typename: "Transaction",
  }) satisfies WithTotal<Transaction>
const createEmptyReport = (year: number, categories: TransactionCategory[]) =>
  // prettier-ignore
  // @ts-expect-error ...
  Object.fromEntries(
    Object.values(TransactionType).map((k) => [k, { 
      reports: Object.fromEntries(
        Object.values(categories)
          .filter(c => c.type === k)
          .map(category => [category.ID, categoryToTransaction(year, category)])),
      total: 0,
    }]),
  ) as ReportByType

export const APBDReportAtom = atom<Report[] | null>(null)

/* -------------------------------------------------------------------------- */
/*                                 Categories                                 */
/* -------------------------------------------------------------------------- */

export const APBDCategoriesAtom = atom<TransactionCategory[] | null>(null)

/* -------------------------------------------------------------------------- */
/*                                For APBD View                               */
/* -------------------------------------------------------------------------- */

// const filterEmptyDetails = (report: WithTotal<Report>) =>
//   report.details.length > 0

export type Year = Opaque<string, "year">
export const currentYearAtom = atom<string | null>(null)

/**
 * Same as ReportByType, but also mapped against year.
 *
 * For example:
 *
 * ```json
 * {
 *   "2024": {
 *     "EXPENSE": {},
 *     "INCOME": {}
 *   },
 *   "2023": {
 *     "EXPENSE": {},
 *     "INCOME": {}
 *   }
 * }
 * ```
 *
 * @see ReportByType
 */
export const APBDReportByYearAndTypeAtom = atom<Record<
  Year,
  ReportByType
> | null>((get) => {
  const years: Record<Year, ReportByType> = {}
  const reports = get(APBDReportAtom)
  const categories = get(APBDCategoriesAtom)

  if (categories == null) return null
  if (reports == null) return null
  if (reports.length < 1) return {}

  const categoriesMap = Object.fromEntries(
    categories.map((cat) => [cat.ID, cat]),
  )

  for (const report of reports) {
    const category = categoriesMap[report.category.ID]
    if (category == null) continue

    const year = (report.year + "") as Year
    if (year === "0") continue
    if (years[year] == null)
      years[year] = createEmptyReport(report.year, categories)

    const newReport = Object.assign({}, report, {
      category,
      total:
        report.details.length === 0
          ? 0
          : report.details
              .map((r) => parseInt(r.value))
              .reduce((a, b) => a + b),
    })

    const typ = category.type
    years[year][typ].reports[category.ID] = newReport
    years[year][typ].total = years[year][typ].total + newReport.total
  }

  return years
})

export const APBDReportByTypeInCurrentYearAtom = atom<ReportByType | null>(
  (get) => {
    const reportsByYear = get(APBDReportByYearAndTypeAtom)
    const currentYear = get(currentYearAtom) as Year

    if (currentYear == null) return null
    if (reportsByYear == null) return null
    if (Object.keys(reportsByYear).length < 1) return null
    return reportsByYear[currentYear]
  },
)

/* -------------------------------------------------------------------------- */
/*                                   Loaders                                  */
/* -------------------------------------------------------------------------- */

// TODO: should load categories once and store in memory instead
export const APBDReportLoader = () => {
  const setAPBDReport = useSetAtom(APBDReportAtom)
  const setAPBDCategories = useSetAtom(APBDCategoriesAtom)
  const [{ data }] = useQuery({ query: getAPBDesReportsWithCategoriesQuery })
  useEffect(() => {
    if (data == null) return
    setAPBDCategories(data.categories)
    setAPBDReport(data.reports)
  }, [data, setAPBDReport, setAPBDCategories])

  return null
}
