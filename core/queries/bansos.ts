import { gql } from "GraphQL/gql.ts"

export const bansosQuery = gql(`
  query bansos {
    bansosStatistic {
      total { name value }
    }
  }
`)

export const bansosRecipientQuery = gql(`
  query bansosRecipient($searchQuery: String!) {
    recipients: bansosRecipient(searchQuery: $searchQuery) {
      name 
      NIK KK
      bansos { name }
    }
  }
`)
