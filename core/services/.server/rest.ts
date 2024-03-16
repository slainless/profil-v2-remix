import { atom } from "jotai"
import ky from "ky"
import urlJoin from "url-join"

import { graphEndpointAtom, serverWebtokenAtom } from "#services/env.js"
import { globalStore } from "#services/store.js"

export const serverRestAtom = atom((get) =>
  ky.create({
    prefixUrl: urlJoin(get(graphEndpointAtom), "../"),
    headers: {
      Authorization: "Bearer " + get(serverWebtokenAtom),
    },
  }),
)

export const getServerRest = () => globalStore.get(serverRestAtom)
