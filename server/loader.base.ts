import type { Request as ExpressRequest } from "express"
import type { Client } from "urql"

import type { ProfileQuery } from "../core/graphql/graphql.ts"
import { getProfile } from "../core/services/.server/profile.ts"
import { ErrorCode } from "../core/services/data.ts"
import {
  createErrorContext,
  type Context,
  type ErrorContext,
} from "./context.ts"
import { getCanonUrl, type DomainContext } from "./domain.ts"

export interface BaseContext extends Context {
  profile: NonNullable<ProfileQuery["profile"]>
  url: string
  canonUrl: string
  baseDomain: string

  token: string
  gqlClient: Client
}

export async function baseContextLoader(
  request: Request | ExpressRequest,
  client: Client,
  domainCtx?: DomainContext,
): Promise<ErrorContext | BaseContext> {
  if (domainCtx == null)
    return createErrorContext(ErrorCode.SchemaNotFound, 404)

  const url =
    request instanceof Request
      ? request.url
      : request.protocol + "://" + request.get("host") + request.originalUrl

  const { data: profile, error } = await getProfile(domainCtx.schema, client)
  if (error != null) return createErrorContext(ErrorCode.ProfileLoadError, 500)

  if (profile?.profile == null)
    return createErrorContext(ErrorCode.ProfileDataEmpty, 500)

  return {
    profile: profile.profile!,
    url,
    canonUrl: getCanonUrl(domainCtx, url),

    token: process.env.VITE_GRAPHQL_ACCESS_WEBTOKEN!,
    gqlClient: client,
    baseDomain: process.env.BASE_DOMAIN!,
  } satisfies BaseContext
}
