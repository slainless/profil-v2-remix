import { gql } from "GraphQL/gql.ts"

export const domainMapQuery = gql(`
  query domainMap {
    map: _domainMap { name value }
  }
`)
