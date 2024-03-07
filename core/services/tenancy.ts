import type { AppLoadContext } from "@remix-run/node"
import { type Request } from "express"
import invariant from "tiny-invariant"

import type { Code, Domain } from "Modules/domain-handler.js"

export function mustGetHost(hostOrRequest: Request | string): string {
  if (typeof hostOrRequest == "string") return hostOrRequest
  if (typeof hostOrRequest == "object" && hostOrRequest.headers != null) {
    const host = hostOrRequest.headers.host
    invariant(host, "Host header must not be empty")
    return host
  } else throw new Error("Invalid host")
}

const regexpHostname = new RegExp(
  `.${process.env.BASE_DOMAIN}(?:\\:${process.env.PORT})?$`,
)
/**
 * Will return normalized host, e.g. host which ends with BASE_DOMAIN will be
 * transformed to .{domain} while custom host/domain will be returned as-is.
 */
export function normalizeHost(hostOrRequest: Request | string): Domain {
  return mustGetHost(hostOrRequest).replace(
    regexpHostname,
    ".{domain}",
  ) as Domain
}

function isSubdomain(
  hostOrRequest: Request | string,
  subdomain: string,
): boolean {
  return (
    subdomain + "." + process.env.BASE_DOMAIN === mustGetHost(hostOrRequest)
  )
}
export function assertSubdomain(
  hostOrRequest: Request | string,
  subdomain: string,
) {
  if (isSubdomain(hostOrRequest, subdomain) == false)
    throw new Response(null, { status: 404 })
}

export function getSchema(
  hostOrRequest: Request | string,
  context: AppLoadContext,
): Code | undefined {
  return context.domain.domainToCode(normalizeHost(hostOrRequest))
}

export function mustGetSchema(
  hostOrRequest: Request | string,
  context: AppLoadContext,
): Code {
  const code = getSchema(hostOrRequest, context)
  if (code == null) throw new Response(null, { status: 404 })
  return code
}

export function mustGetAccessType(request: Request, context: AppLoadContext) {
  const host = mustGetHost(request)
  if (isSubdomain(host, "oauth")) return { type: "oauth" } as const
  const code = mustGetSchema(host, context)
  return {
    type: "profile",
    code,
  } as const
}
