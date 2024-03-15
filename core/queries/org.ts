import { gql } from "#graphql/gql.ts"

export const orgMembersQuery = gql(`
  query orgMembersQuery {
    members: govMembers(sortBy: POSITION, sort: DESC, type: APARAT) {
      name
      photoURL
      position
    }
  }
`)
