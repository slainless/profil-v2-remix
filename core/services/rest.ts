import { atom } from "jotai"
import ky from "ky"
import urlJoin from "url-join"

import { graphEndpointAtom, serverWebtokenAtom } from "#services/env.js"
import { globalStore } from "#services/store.js"

export const publicRestAtom = atom((get) =>
  ky.create({
    prefixUrl: urlJoin(get(graphEndpointAtom), "../"),
    headers: {
      Authorization: "Bearer " + get(serverWebtokenAtom),
    },
  }),
)

export const getPublicRest = () => globalStore.get(publicRestAtom)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formData = (obj: Record<string, any>) => {
  const form = new FormData()
  for (const key in obj) {
    form.append(key, obj[key])
  }
  return form
}
