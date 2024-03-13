import type { Context } from "Services/.server/context.ts"
import type { NormalizedError } from "Services/response.ts"

import type { Memory } from "./memory.ts"

export module "@remix-run/node" {
  export interface AppLoadContext extends Memory, Partial<Context> {
    error?: NormalizedError
  }
}
