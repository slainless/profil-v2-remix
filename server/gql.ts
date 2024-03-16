import type { Environment } from "#schema/env.js"
import { Client, fetchExchange } from "@urql/core"

import { isCloudflare } from "./is.ts"

// import { cacheExchange } from '@urql/exchange-graphcache'

export function createGQLClient(env: Environment) {
  return new Client({
    url: env.VITE_GRAPHQL_ENDPOINT!,
    exchanges: [fetchExchange],
    fetchOptions: {
      cache: isCloudflare() ? undefined : "no-cache",
      headers: {
        Authorization: `Bearer ${env.VITE_GRAPHQL_ACCESS_WEBTOKEN}`,
      },
    },
  })
}
