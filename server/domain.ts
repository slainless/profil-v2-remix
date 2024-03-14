import type { UnderscoredCode, Domain } from "../core/modules/domain-handler.ts"

export interface DomainContext {
  schema: UnderscoredCode
  domain: Domain
  canonDomain: Domain
  slug: string
}

export function getCanonUrl(domainCtx: DomainContext, currentUrl: string) {
  const canonical = new URL(currentUrl)
  canonical.hostname = domainCtx.canonDomain
  return canonical.href
}
