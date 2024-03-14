import type { AppLoadContext } from "@remix-run/cloudflare"
import type { Request } from "express"

import { DomainHandler } from "../core/modules/domain-handler.ts"
import { domainContextLoader, mustGetDomainList } from "./express.ts"
import { createGQLClient } from "./gql.ts"
import { baseContextLoader } from "./loader.base.ts"

export async function createExpressContextLoader() {
  const client = createGQLClient()
  const domainHandler = new DomainHandler(await mustGetDomainList(client))

  return async (request: Request) => {
    const domainContext = await domainContextLoader(request, domainHandler)
    return {
      ...domainContext,
      ...(await baseContextLoader(request, client, domainContext)),
    } as AppLoadContext
  }
}
