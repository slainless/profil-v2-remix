import type { Client } from "urql"

import type { UnderscoredCode } from "../modules/domain-handler.ts"
import { withHeaders } from "../modules/urql.ts"
import { profileQuery } from "../queries/profile.ts"

export async function getProfile(schema: UnderscoredCode, client: Client) {
  return client.query(profileQuery, {}, withHeaders(schema))
}
