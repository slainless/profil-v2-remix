import merge from "lodash.merge"
import { createElement, type PropsWithChildren } from "react"
import { Client, Provider, cacheExchange, fetchExchange } from "urql"

import type { UnderscoredCode } from "Modules/domain-handler.ts"
import { withHeaders } from "Modules/urql.ts"

export interface UrqlProviderProps extends PropsWithChildren {
  schema: UnderscoredCode
  endpoint: string
  token: string
}
export function UrqlProvider({
  schema,
  token,
  endpoint,
  children,
}: UrqlProviderProps) {
  const client = new Client({
    url: endpoint,
    exchanges: [cacheExchange, fetchExchange],
    ...merge(withHeaders(schema), {
      fetchOptions: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }),
  })
  return createElement(Provider, { value: client }, [children])
}
