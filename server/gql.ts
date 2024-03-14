import { Client, fetchExchange } from "@urql/core"

// import { cacheExchange } from '@urql/exchange-graphcache'

export function createGQLClient() {
  return new Client({
    url: process.env.VITE_GRAPHQL_ENDPOINT!,
    exchanges: [fetchExchange],
    fetchOptions: {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${process.env.VITE_GRAPHQL_ACCESS_WEBTOKEN}`,
      },
    },
  })
}
