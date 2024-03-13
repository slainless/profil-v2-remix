import type { AppLoadContext } from "@remix-run/node"
import type { Request } from "express"

import { getCanonUrl } from "Services/.server/domain.ts"
import { getProfile } from "Services/.server/profile.ts"
import { ErrorCode } from "Services/data.ts"
import {
  createNormalizedError,
  type NormalizedError,
} from "Services/response.ts"
import { mustGetHost, normalizeHost } from "Services/tenancy.ts"

import type { UnderscoredCode } from "Modules/domain-handler.ts"

import type { Memory } from "./memory.ts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createError = (code: ErrorCode, status: number, data?: any) =>
  createNormalizedError({ code, error: data, status })

export function contextLoader(memory: Memory) {
  const m = memory
  const err = (res: NormalizedError) => ({ ...m, error: res })
  return async (request: Request): Promise<AppLoadContext> => {
    const url =
      request.protocol + "://" + request.get("host") + request.originalUrl
    const host = normalizeHost(mustGetHost(request))
    const schema = m.domain.domainToCode(host)

    if (schema == null) return err(createError(ErrorCode.SchemaNotFound, 404))

    const { data: profile, error } = await getProfile(
      schema.replaceAll(".", "_") as UnderscoredCode,
      m.gqlClient,
    )
    if (error != null) return err(createError(ErrorCode.ProfileLoadError, 500))

    if (profile?.profile == null)
      return err(createError(ErrorCode.ProfileDataEmpty, 500))

    return {
      ...m,
      profile: profile.profile!,
      url,
      schema,
      canonUrl: getCanonUrl(m.domain, host, url),

      baseDomain: process.env.BASE_DOMAIN!,
      subdomain: m.domain.codeToSlug(schema)!,
      token: import.meta.env.VITE_GRAPHQL_ACCESS_WEBTOKEN!,
    }
  }
}
