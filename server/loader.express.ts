import type { Request } from "express"

import { ErrorCode } from "Services/data.ts"

import { DomainHandler } from "../core/modules/domain-handler.ts"
import { createErrorContext, type CommonContext } from "./context.ts"
import { domainContextLoader, mustGetDomainList } from "./express.ts"
import { createGQLClient } from "./gql.ts"
import { baseContextLoader } from "./loader.base.ts"

export async function createExpressContextLoader() {
  const client = createGQLClient()
  const domainHandler = new DomainHandler(await mustGetDomainList(client))

  return async (request: Request) => {
    const domainContext = await domainContextLoader(request, domainHandler)
    if (domainContext == null)
      return createErrorContext(ErrorCode.SchemaNotFound, 404)
    return {
      ...domainContext,
      ...(await baseContextLoader(request, client, domainContext)),
    } as CommonContext
  }
}
