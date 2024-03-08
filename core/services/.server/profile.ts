import type { AppLoadContext } from "@remix-run/node"
import type { Client } from "urql"

import { profileQuery } from "Queries/profile.ts"

import type { UnderscoredCode } from "Modules/domain-handler.ts"
import { withHeaders } from "Modules/urql.ts"

export async function getProfile(schema: UnderscoredCode, client: Client) {
  return client.query(profileQuery, {}, withHeaders(schema))
}
