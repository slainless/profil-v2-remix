import type { UnderscoredCode } from "Modules/domain-handler.ts"

import { ErrorCode } from "../core/services/data.ts"
import {
  createErrorContext,
  type CommonContext,
  type Context,
  type ErrorContext,
} from "./context.ts"
import { isDomainContext } from "./domain.ts"
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
  | (ServerContext & CloudflareContext)
  | ErrorContext
> {
  const serverContext = createServerContext()
  const host = normalizeHost(mustGetHost(request))
  if (new URL(request.url).hostname === process.env.BASE_DOMAIN)
    return {
      ...serverContext,
      ...context,
    }
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
      domainContext,
    )),
  }
}
