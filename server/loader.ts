import type { AppLoadContext } from "@remix-run/node"
import type { Request } from "express"

import { getCanonUrl } from "Services/.server/domain.ts"
import { getProfile } from "Services/.server/profile.ts"
import { mustGetHost, normalizeHost } from "Services/tenancy.ts"

import type { UnderscoredCode } from "Modules/domain-handler.ts"

import type { Memory } from "./memory.ts"

export function contextLoader(memory: Memory) {
  const m = memory
  const err = (res: Response) => ({ ...m, error: res })
  return async (request: Request): Promise<AppLoadContext> => {
    const url =
      request.protocol + "://" + request.get("host") + request.originalUrl
    const host = normalizeHost(mustGetHost(request))
    const schema = m.domain.domainToCode(host)

    if (schema == null)
      return err(
        new Response(
          `ProfileLoadError: schema is not registered on client list`,
          { status: 404 },
        ),
      )

    const { data: profile, error } = await getProfile(
      schema.replaceAll(".", "_") as UnderscoredCode,
      m.gqlClient,
    )
    if (error != null)
      return err(new Response(`ProfileLoadError: ${error}`, { status: 500 }))

    if (profile?.profile == null)
      return err(
        new Response(`ProfileLoadError: failed to load profile data`, {
          status: 500,
        }),
      )

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
