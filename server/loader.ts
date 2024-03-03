import type { AppLoadContext } from "@remix-run/node"
import type { Request } from "express"
import type { Client } from "urql"

import { profileQuery } from "Queries/profile.ts"

import type { Code } from "Modules/domain-handler.ts"
import { withHeaders } from "Modules/urql.ts"

import type { Memory } from "./memory.ts"
import { normalizeHost } from "./tenancy.ts"

async function getProfile(
  schema: Code | undefined,
  client: Client,
): Promise<AppLoadContext["profileQuery"]> {
  if (schema == null) return [undefined, undefined]
  const { data, error } = await client.query(
    profileQuery,
    {},
    withHeaders(schema),
  )
  return [data?.profile, error]
}

export function contextLoader(memory: Memory) {
  const m = memory
  return async (req: Request): Promise<AppLoadContext> => {
    const schema = m.domain.domainToCode(normalizeHost(req))

    return {
      ...memory,
      schema,
      profileQuery: await getProfile(schema, m.gqlClient),
    }
  }
}
