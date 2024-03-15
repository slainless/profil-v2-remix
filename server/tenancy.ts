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
        : hostOrRequest.headers.host
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
export function normalizeHost(
  hostOrRequest: Request | ExpressRequest | string,
): Domain {
  return mustGetHost(hostOrRequest).replace(
    regexpHostname,
    ".{domain}",
  ) as Domain
}
