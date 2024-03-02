import { gql } from "../graphql/gql.ts"

export const domainMapQuery = gql(`
  query domainMap {
    map: _domainMap { name value }
  }
`)
