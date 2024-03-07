import type { AppLoadContext } from "@remix-run/node"
import invariant from "tiny-invariant"
import type { Client } from "urql"

import { domainMapQuery } from "Queries/domain.ts"

import type {
  Code,
  Domain,
  DomainHandler,
  DomainToCodeMap,
} from "Modules/domain-handler.ts"

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

export function getCanonUrl(
  domainHandler: DomainHandler,
  currentDomain: Domain,
  currentUrl: string,
) {
  const canonical = new URL(currentUrl)
  const canonDomain = domainHandler.getCanonDomain(currentDomain)
  if (canonDomain !== currentDomain) canonical.hostname = canonDomain
  return canonical.href
}
