import type { UnderscoredCode } from "#modules/domain-handler.ts"

import { isEnvironment } from "../core/schema/env.compiled.ts"
import { ErrorCode } from "../core/services/data.ts"
import {
  createErrorContext,
  type CommonContext,
  type Context,
  type ErrorContext,
} from "./context.ts"
import { isDomainContext } from "./domain.ts"
import type { EnvContext } from "./env.ts"
import { baseContextLoader } from "./loader.base.ts"
import { createServerContext, type ServerContext } from "./loader.server.ts"
import { mustGetHost, normalizeHost } from "./tenancy.ts"

export interface CloudflareContext extends Context {
  cloudflare: Cloudflare
}

interface CloudflareContextLoaderArgs {
  context: CloudflareContext
  request: Request
}
export async function cloudflareContextLoader({
  request,
  context,
}: CloudflareContextLoaderArgs): Promise<
  | (CommonContext & CloudflareContext)
  | (ServerContext & EnvContext & CloudflareContext)
  | ErrorContext
> {
  if (!isEnvironment(context.env))
    return createErrorContext(ErrorCode.MisconfiguredEnv, 500)

  const serverContext = createServerContext(context.env)
  const host = normalizeHost(mustGetHost(request), context.env.BASE_DOMAIN)
  if (new URL(request.url).hostname === context.env.BASE_DOMAIN)
    return {
      ...serverContext,
      ...context,
    } as ServerContext & EnvContext & CloudflareContext
  const domainContext = await context.cloudflare.env.DOMAIN_MAP_KV.get(
    host,
    "json",
  )
  if (!isDomainContext(domainContext))
    return createErrorContext(ErrorCode.SchemaNotFound, 404)
  domainContext.schema = domainContext.schema.replaceAll(
    ".",
    "_",
  ) as UnderscoredCode

  return {
    ...serverContext,
    ...domainContext,
    ...context,
    ...(await baseContextLoader(
      request,
      serverContext.gqlClient,
      context.env,
      domainContext,
    )),
  } as CommonContext & CloudflareContext
}
