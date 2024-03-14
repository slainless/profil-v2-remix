import type { Context } from "./context.ext.d.ts"
import type { DomainContext } from "./domain.ts"
import type { BaseContext } from "./loader.base.ts"

export interface CommonContext extends BaseContext, DomainContext {}

export function assertCommonContext(
  ctx: Context,
): asserts ctx is CommonContext {
  if (ctx.error)
    throw new Response(JSON.stringify(ctx.error), {
      status: ctx.error.status,
    })
}

export function mustGetCommonContext(ctx: Context): CommonContext {
  assertCommonContext(ctx)
  return ctx
}
