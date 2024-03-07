import type { Context } from "Services/.server/context.ts"

import type { Memory } from "./memory.ts"

export module "@remix-run/node" {
  export interface AppLoadContext extends Memory, Partial<Context> {
    error?: Response
  }
}
