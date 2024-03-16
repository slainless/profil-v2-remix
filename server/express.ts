import type { Request } from "express"
import invariant from "tiny-invariant"
import type { Client } from "urql"

import type {
  Code,
  Domain,
  DomainHandler,
  DomainToCodeMap,
  UnderscoredCode,
} from "../core/modules/domain-handler.ts"
import { domainMapQuery } from "../core/queries/domain.ts"
import type { Environment } from "../core/schema/env.ts"
import type { DomainContext } from "./domain.ts"
import { mustGetHost, normalizeHost } from "./tenancy.ts"

export async function domainContextLoader(
  request: Request,
  env: Environment,
  handler: DomainHandler,
): Promise<DomainContext | undefined> {
  const host =
    (env.BYPASS_FIX_REQUEST_HOSTNAME as Domain) ??
    normalizeHost(mustGetHost(request), process.env.BASE_DOMAIN!)
  const schema = handler.domainToCode(host)
  if (schema == null) return
  const slug = handler.codeToSlug(schema)
  if (slug == null) return

  return {
    schema: schema.replaceAll(".", "_") as UnderscoredCode,
    domain: host,
    canonDomain: handler.getCanonDomain(host),
    slug,
  }
}

export async function mustGetDomainList(
  client: Client,
): Promise<DomainToCodeMap> {
  const { data, error } = await client.query(domainMapQuery, {})

  if (error != null) throw error
  invariant(data, "Domain map is empty!")

  const map: DomainToCodeMap = {}
  for (const entry of data.map) map[entry.name as Domain] = entry.value as Code

  return map
}
