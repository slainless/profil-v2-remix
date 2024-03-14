import type { DomainContext } from "./domain.ts"
import type { BaseContext, ErrorContext } from "./loader.base.ts"

interface Context
  extends Partial<BaseContext>,
    Partial<DomainContext>,
    Partial<ErrorContext> {}

export module "@remix-run/node" {
  export interface AppLoadContext extends Context {}
}
