import type { ErrorContext } from "./context.ts"
import type { DomainContext } from "./domain.ts"
import type { BaseContext } from "./loader.base.ts"
import type { CloudflareContext } from "./loader.cloudflare.ts"
import type { ServerContext } from "./loader.server.ts"

interface AllContext
  extends Partial<BaseContext>,
    Partial<DomainContext>,
    Partial<ServerContext>,
    Partial<ErrorContext>,
    Partial<CloudflareContext> {}

export module "@remix-run/node" {
  export interface AppLoadContext extends AllContext {}
}
