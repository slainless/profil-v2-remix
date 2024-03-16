import { atom, getDefaultStore } from "jotai"

import { UserLevel, UserStatus } from "#graphql/graphql.ts"

import { TokenResponse } from "#services/.client/login.ts"
import { User } from "#services/user.ts"

import { publicWebtokenAtom } from "../env.ts"

export const usernameAtom = atom<string | null>(null)
export const userAtom = atom<User | null>(null)

export const userLevelAtom = atom<UserLevel>(UserLevel.User)
export const userSchemaAtom = atom<string | null>(null)
export const userStatusAtom = atom<UserStatus>(UserStatus.Unverified)
export const userWebtokenAtom = atom<string>(
  getDefaultStore().get(publicWebtokenAtom),
)

export const credentialAtom = atom(
  (get) => ({
    level: get(userLevelAtom),
    desa: get(userSchemaAtom),
    status: get(userStatusAtom),
    token: get(userWebtokenAtom),
  }),
  (get, set, value: TokenResponse | null) => {
    if (value == null) {
      set(userWebtokenAtom, get(publicWebtokenAtom))
      set(userStatusAtom, UserStatus.Unverified)
      set(userSchemaAtom, null)
      set(userLevelAtom, UserLevel.User)
      return
    }

    set(userWebtokenAtom, value.access_token)
    set(userSchemaAtom, value.desa)
    set(userStatusAtom, value.status)
    set(userLevelAtom, value.level)
  },
)
