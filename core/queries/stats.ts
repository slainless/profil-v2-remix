import { gql } from "#graphql/gql.ts"

export const budgetSummaryQuery = gql(`
  query budgetSummary {
    summary: latestAPBDSummary {
      expense
      income
      financingExpense
      financingIncome
      year
    }
  }
`)

export const populationSummaryQuery = gql(`
  query populationSummary {
    summary: populationStatistic {
      total
      male
      female
      temporary
      mutation
      mutationOut     { value }
      statusInFamily  { name value }
    }
  }
`)

export const populationMutationSummaryQuery = gql(`
  query populationMutationSummary {
    summary: populationStatistic {
      total
      mutationOut { value }
    }
  }
`)

export const stuntingQuery = gql(`
  query stunting {
    stunting(limit: 3) {
      year
      keluargaSasaran
      berisiko
      baduta
      balita
      pasanganUsiaSubur
      pasanganUsiaSuburHamil
    }
  }
`)
