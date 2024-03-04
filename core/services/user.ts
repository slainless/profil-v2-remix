import { UserLevel, UserStatus } from "GraphQL/graphql.ts"

export interface User {
  name: string
  photoURL: string

  status: UserStatus
  role: UserLevel
}
