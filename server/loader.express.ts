import { isEnvironment } from "#schema/env.compiled.js"
import { Environment } from "#schema/env.js"
import { Value } from "@sinclair/typebox/value"
import type { Request } from "express"

import { ErrorCode } from "#services/data.ts"

import { DomainHandler } from "../core/modules/domain-handler.ts"
import { createErrorContext, type CommonContext } from "./context.ts"
import { domainContextLoader, mustGetDomainList } from "./express.ts"
import { baseContextLoader } from "./loader.base.ts"
import { createServerContext } from "./loader.server.ts"

export async function createExpressContextLoader() {
  const env = process.env
  if (!isEnvironment(env)) {
    throw Value.Errors(Environment, env)
  }
  const serverContext = createServerContext(env)
  const domainHandler = new DomainHandler(
    await mustGetDomainList(serverContext.gqlClient),
  )

  return async (request: Request) => {
    const domainContext = await domainContextLoader(request, env, domainHandler)
    if (domainContext == null)
      return createErrorContext(ErrorCode.SchemaNotFound, 404)
    return {
      ...serverContext,
      ...domainContext,
      ...(await baseContextLoader(
        request,
        serverContext.gqlClient,
        env,
        domainContext,
      )),
      env,
    } as CommonContext
  }
}
