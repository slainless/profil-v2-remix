import { ErrorCode } from "#services/data.ts"
import type { Request } from "express"

import { DomainHandler } from "../core/modules/domain-handler.ts"
import { createErrorContext, type CommonContext } from "./context.ts"
import { domainContextLoader, mustGetDomainList } from "./express.ts"
import { baseContextLoader } from "./loader.base.ts"
import { createServerContext } from "./loader.server.ts"

export async function createExpressContextLoader() {
  const serverContext = createServerContext()
  const domainHandler = new DomainHandler(
    await mustGetDomainList(serverContext.gqlClient),
  )

  return async (request: Request) => {
    if (request.hostname === process.env.BASE_DOMAIN) return serverContext
    const domainContext = await domainContextLoader(request, domainHandler)
    if (domainContext == null)
      return createErrorContext(ErrorCode.SchemaNotFound, 404)
    return {
      ...serverContext,
      ...domainContext,
      ...(await baseContextLoader(
        request,
        serverContext.gqlClient,
        domainContext,
      )),
    } as CommonContext
  }
}
