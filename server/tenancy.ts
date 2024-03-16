import { type Request as ExpressRequest } from "express"
import invariant from "tiny-invariant"

import type { Domain } from "../core/modules/domain-handler.js"

export function mustGetHost(
  hostOrRequest: Request | ExpressRequest | string,
): string {
  if (typeof hostOrRequest == "string") return hostOrRequest
  if (typeof hostOrRequest == "object" && hostOrRequest.headers != null) {
    const host =
      hostOrRequest instanceof Request
        ? new URL(hostOrRequest.url).hostname
        : hostOrRequest.headers.host?.replace(/:\d+$/, "")
    invariant(host, "Host header must not be empty")
    return host
  } else throw new Error("Invalid host")
}

/**
 * Will return normalized host, e.g. host which ends with BASE_DOMAIN will be
 * transformed to .{domain} while custom host/domain will be returned as-is.
 */
export function normalizeHost(
  hostOrRequest: Request | ExpressRequest | string,
  baseDomain: string,
): Domain {
  const host = mustGetHost(hostOrRequest)
  if (host.endsWith(baseDomain))
    return (host.slice(0, host.length - baseDomain.length) +
      "{domain}") as Domain
  return host as Domain
}
