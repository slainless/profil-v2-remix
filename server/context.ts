import { ErrorCode } from "../core/services/data.ts"
import {
  createNormalizedError,
  type NormalizedError,
} from "../core/services/response.ts"
import type { AllContext } from "./context.ext"
import type { DomainContext } from "./domain.ts"
import type { BaseContext } from "./loader.base.ts"

export interface Context {
  [I: string]: unknown
}
export interface CommonContext extends BaseContext, DomainContext {}
export interface ErrorContext extends Context {
  error: NormalizedError
}

export function assertCommonContext(
  ctx: AllContext,
): asserts ctx is CommonContext {
  if (ctx.error)
    throw new Response(JSON.stringify(ctx.error), {
      status: ctx.error.status,
    })
  if (ctx.profile == null) {
    const error = createErrorContext(ErrorCode.ContextEmpty, 500)
    throw new Response(JSON.stringify(error.error), { status: 500 })
  }
}

export function mustGetCommonContext(ctx: AllContext): CommonContext {
  assertCommonContext(ctx)
  return ctx
}

export const createErrorContext = (
  code: ErrorCode,
  status: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) =>
  ({
    error: createNormalizedError({ code, error: data, status }),
  }) as ErrorContext
