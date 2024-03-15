import { ErrorCode } from "../core/services/data.ts"
import {
  createErrorContext,
  type CommonContext,
  type Context,
  type ErrorContext,
} from "./context.ts"
import { isDomainContext } from "./domain.ts"
import { createGQLClient } from "./gql.ts"
import { baseContextLoader } from "./loader.base.ts"
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
  (CommonContext & CloudflareContext) | ErrorContext
> {
  const host = normalizeHost(mustGetHost(request))
  const domainContext = await context.cloudflare.env.DOMAIN_MAP_KV.get(
    host,
    "json",
  )
  if (!isDomainContext(domainContext))
    return createErrorContext(ErrorCode.SchemaNotFound, 404)

  const client = createGQLClient()
  return {
    ...domainContext,
    ...context,
    ...(await baseContextLoader(request, client, domainContext)),
  }
}
