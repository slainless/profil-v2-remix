import type { AppLoadContext } from "@remix-run/node"
import type { Client } from "urql"

import { profileQuery } from "Queries/profile.ts"

import type { Code } from "Modules/domain-handler.ts"
import { withHeaders } from "Modules/urql.ts"

export async function getProfile(schema: Code, client: Client) {
  return client.query(profileQuery, {}, withHeaders(schema))
}
