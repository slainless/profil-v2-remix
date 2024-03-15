import { UserLevel, UserStatus } from "#graphql/graphql.ts"

export interface User {
  name: string
  photoURL: string

  status: UserStatus
  role: UserLevel
}
