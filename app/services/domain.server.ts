import type { ApolloClient, NormalizedCacheObject } from "@apollo/client"

import { domainMapQuery } from "Queries/domain"

import type { Code, Domain, DomainToCodeMap } from "Modules/domain-handler.js"

export async function getDomainList(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<DomainToCodeMap> {
  const { data, error } = await client.query({
    query: domainMapQuery,
    context: {
      fetchOptions: {
        // disable cache to make sure data will always be latest
        cache: "no-cache",
      },
    },
  })

  if (error != null) throw error

  const map: DomainToCodeMap = {}
  for (const entry of data.map) map[entry.name as Domain] = entry.value as Code

  return map
}
