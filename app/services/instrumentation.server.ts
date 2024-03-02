import { ApolloClient, InMemoryCache } from "@apollo/client"

import { DomainHandler } from "Modules/domain-handler.js"

import { getDomainList } from "./domain.server.js"
import { setMemory } from "./memory.server.js"

export async function instrumentation() {
  const serverGQLClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_ACCESS_WEBTOKEN}`,
    },
  })

  const domainHandler = new DomainHandler(await getDomainList(serverGQLClient))
  setMemory({
    domain: domainHandler,
    gqlClient: serverGQLClient,
  })
}
