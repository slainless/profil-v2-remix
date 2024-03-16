import { atom } from "jotai"
import ky from "ky"
import urlJoin from "url-join"

import { globalStore } from "#services/store.js"

import { graphEndpointAtom, publicWebtokenAtom } from "../env.ts"
import { userWebtokenAtom } from "./user.ts"

export const userRestAtom = atom((get) =>
  ky.create({
    prefixUrl: urlJoin(get(graphEndpointAtom), "../"),
    headers: {
      Authorization: "Bearer " + get(userWebtokenAtom),
    },
  }),
)

export const getUserRest = () => globalStore.get(userRestAtom)
