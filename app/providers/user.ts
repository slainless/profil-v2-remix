import { atom } from "jotai"

import { UserLevel, UserStatus } from "GraphQL/graphql.ts"

import { TokenResponse } from "Services/.client/login.ts"
import { User } from "Services/user.ts"

export const usernameAtom = atom<string | null>(null)
export const userAtom = atom<User | null>(null)

export const userLevelAtom = atom<UserLevel>(UserLevel.User)
export const userSchemaAtom = atom<string | null>(null)
export const userStatusAtom = atom<UserStatus>(UserStatus.Unverified)
export const userTokenAtom = atom<string>(
  import.meta.env.VITE_GRAPHQL_ACCESS_WEBTOKEN!,
)

export const credentialAtom = atom(
  (get) => ({
    level: get(userLevelAtom),
    desa: get(userSchemaAtom),
    status: get(userStatusAtom),
    token: get(userTokenAtom),
  }),
  (_, set, value: TokenResponse | null) => {
    if (value == null) {
      set(userTokenAtom, import.meta.env.VITE_GRAPHQL_ACCESS_WEBTOKEN!)
      set(userStatusAtom, UserStatus.Unverified)
      set(userSchemaAtom, null)
      set(userLevelAtom, UserLevel.User)
      return
    }

    set(userTokenAtom, value.access_token)
    set(userSchemaAtom, value.desa)
    set(userStatusAtom, value.status)
    set(userLevelAtom, value.level)
  },
)
