import { Type, type Static } from "@sinclair/typebox"
import { TypeCompiler } from "@sinclair/typebox/compiler"

import type { UnderscoredCode, Domain } from "../core/modules/domain-handler.ts"
import type { Context } from "./context.ts"

export const DomainContextSchema = Type.Object({
  schema: Type.String(),
  domain: Type.String(),
  canonDomain: Type.String(),
  slug: Type.String(),
})

export const CompiledDomainContextSchema =
  TypeCompiler.Compile(DomainContextSchema)

export type DomainContextSchema = Static<typeof DomainContextSchema>
export const isDomainContext = (arg: unknown): arg is DomainContext =>
  CompiledDomainContextSchema.Check(arg)

export interface DomainContext extends DomainContextSchema, Context {
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
