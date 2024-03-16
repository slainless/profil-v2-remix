import { Value } from "@sinclair/typebox/value"

import type { UnderscoredCode } from "#modules/domain-handler.ts"

import { isEnvironment } from "../core/schema/env.compiled.ts"
import { Environment } from "../core/schema/env.js"
import { ErrorCode } from "../core/services/data.ts"
import {
  createErrorContext,
  type CommonContext,
  type Context,
  type ErrorContext,
} from "./context.ts"
import { isDomainContext } from "./domain.ts"
import { baseContextLoader } from "./loader.base.ts"
import { createServerContext } from "./loader.server.ts"
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
  const env = context.cloudflare.env
  if (!isEnvironment(env)) {
    console.error(Array.from(Value.Errors(Environment, env)))
    return createErrorContext(ErrorCode.MisconfiguredEnv, 500)
  }

  const serverContext = createServerContext(env)
  const host =
    env.BYPASS_FIX_REQUEST_HOSTNAME ??
    normalizeHost(mustGetHost(request), env.BASE_DOMAIN)
  const domainContext = await env.DOMAIN_MAP_KV.get(host, "json")
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
      env,
      domainContext,
    )),
    env,
  } as CommonContext & CloudflareContext
}
