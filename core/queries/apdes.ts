import { gql } from "GraphQL/gql.ts"

export const commonTxnFieldsFragment = gql(`
  fragment commonTxnFields on Transaction {
    year
    budget
    category { ID }
    details {
      name
      value
    }
  }
`)

export const commonTxnCategoryFieldsFragment = gql(`
  fragment commonTxnCategoryFields on TransactionCategory {
    ID
    name
    type
  }
`)

export const getAPBDesReportsQuery = gql(`
  query getAPBDesReports($from: Int, $to: Int) {
    reports: APBDReport(fromYear: $from, toYear: $to) {
      ...commonTxnFields
    }
  }
`)

export const getAPBDesCategoriesQuery = gql(`
  query getAPBDesCategories {
    categories: APBDCategories {
      ...commonTxnCategoryFields
    }
  }
`)

export const getAPBDesReportsWithCategoriesQuery = gql(`
  query getAPBDesReportsWithCategories($from: Int, $to: Int) {
    reports: APBDReport(fromYear: $from, toYear: $to) {
      ...commonTxnFields
    }
    categories: APBDCategories {
      ...commonTxnCategoryFields
    }
  }
`)
