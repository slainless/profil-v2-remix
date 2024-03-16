import type { Environment } from "#schema/env.ts"
import { atom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"

import { Service } from "#services/oauth.ts"

import { globalStore } from "./store.ts"

export const clientIDsAtom = atom<Record<Service, string>>({
  [Service.Google]: "",
  [Service.Facebook]: "",
})

export const assetBaseUrlAtom = atom("")
export const graphEndpointAtom = atom("")

export const publicWebtokenAtom = atom("")
export const serverWebtokenAtom = atom("")

export const recaptchaSiteKeyAtom = atom("")
export const googleAnalyticTagAtom = atom("")
export const maptilerKeyAtom = atom("")

export function pickClientEnv(env: Environment): ClientEnv {
  return Object.fromEntries(
    Object.entries(env).filter((v) => v[0].startsWith("VITE_")),
  ) as ClientEnv
}

type ClientEnv = {
  [K in keyof Environment as K extends `VITE_${string}`
    ? K
    : never]: Environment[K]
}

interface EnvHydratorProps {
  env: ClientEnv
}
export default function EnvHydrator({ env }: EnvHydratorProps) {
  useHydrateAtoms(
    [
      [
        clientIDsAtom,
        {
          [Service.Google]: env.VITE_GOOGLE_OAUTH_CLIENT_ID,
          [Service.Facebook]: env.VITE_FACEBOOK_OAUTH_CLIENT_ID,
        },
      ],
      [assetBaseUrlAtom, env.VITE_ASSET_BASE_URL],
      [graphEndpointAtom, env.VITE_GRAPHQL_ENDPOINT],
      [publicWebtokenAtom, env.VITE_GRAPHQL_ACCESS_WEBTOKEN],
      [recaptchaSiteKeyAtom, env.VITE_RECAPTCHA_SITE_KEY],
      [googleAnalyticTagAtom, env.VITE_GA_ID],
      [maptilerKeyAtom, env.VITE_MAPTILER_KEY],
    ],
    {
      dangerouslyForceHydrate: true,
    },
  )
  return null
}

export function hydrateServerEnv(env: Environment) {
  globalStore.set(assetBaseUrlAtom, env.VITE_ASSET_BASE_URL)
  globalStore.set(graphEndpointAtom, env.VITE_GRAPHQL_ENDPOINT)
  globalStore.set(serverWebtokenAtom, env.GRAPHQL_ACCESS_WEBTOKEN)
}
