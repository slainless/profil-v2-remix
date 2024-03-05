import { gql } from "GraphQL/gql.ts"

export const userQuery = gql(`
  query user($username: String!) {
    user: userByUsername(username: $username) {
      ID
      desa {
        deskel
        kabkota
        provinsi
      }
      name
      phone
      photoURL
    }
  }
`)
