import type { AppLoadContext } from "@remix-run/node"

import type { ProfileQuery } from "GraphQL/graphql.ts"

import type { Code } from "Modules/domain-handler.ts"

export interface Context {
  profile: NonNullable<ProfileQuery["profile"]>
  url: string
  canonUrl: string
  schema: Code

  baseDomain: string
  subdomain: string
  token: string
}

export function mustNormalizeContext(context: AppLoadContext): Context {
  if (context.error) throw context.error
  return context as Context
}
