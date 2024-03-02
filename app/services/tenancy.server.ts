import invariant from "tiny-invariant"

import type { Code, Domain } from "Modules/domain-handler.js"

import { memory } from "./memory.server.js"

export function mustGetHost(hostOrRequest: Request | string): string {
  if (hostOrRequest instanceof Request) {
    const host = hostOrRequest.headers.get("Host")
    invariant(host, "Host header must not be empty")
    return host
  }
  return hostOrRequest
}

const regexpHostname = new RegExp(`.${process.env.BASE_DOMAIN}$`)
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

export function mustGetSchema(hostOrRequest: Request | string): Code {
  const code = memory().domain.domainToCode(normalizeHost(hostOrRequest))
  if (code == null) throw new Response(null, { status: 404 })
  return code
}

export function mustGetAccessType(request: Request) {
  const host = mustGetHost(request)
  if (isSubdomain(host, "oauth")) return { type: "oauth" } as const
  const code = mustGetSchema(host)
  return {
    type: "profile",
    code,
  } as const
}
