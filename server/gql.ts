import { Client, fetchExchange } from "@urql/core"

// import { cacheExchange } from '@urql/exchange-graphcache'

export function createGQLClient() {
  return new Client({
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    exchanges: [fetchExchange],
    fetchOptions: {
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_ACCESS_WEBTOKEN}`,
      },
    },
  })
}
