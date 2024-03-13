import type { AppLoadContext } from "@remix-run/node"

import type { ProfileQuery } from "GraphQL/graphql.ts"

import type { Code, UnderscoredCode } from "Modules/domain-handler.ts"

export interface Context {
  profile: NonNullable<ProfileQuery["profile"]>
  url: string
  canonUrl: string
  schema: Code

  baseDomain: string
  subdomain: string
  token: string
}

export function mustNormalizeContext(context: AppLoadContext) {
  if (context.error)
    throw new Response(JSON.stringify(context.error), {
      status: context.error.status,
    })
  return {
    ...context,
    schema: context.schema?.replaceAll(".", "_") as UnderscoredCode,
  } as Omit<Context, "schema"> & { schema: UnderscoredCode }
}
