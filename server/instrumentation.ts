import { mustGetDomainList } from "Services/domain.server.ts"

import { DomainHandler } from "Modules/domain-handler.ts"

import { createGQLClient } from "./gql.js"
import type { Memory } from "./memory.js"

export async function instrumentation(): Promise<Memory> {
  const serverGQLClient = createGQLClient()
  const domainHandler = new DomainHandler(
    await mustGetDomainList(serverGQLClient),
  )

  return {
    gqlClient: serverGQLClient,
    domain: domainHandler,
  }
}
