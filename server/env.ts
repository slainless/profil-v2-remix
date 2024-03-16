import type { Environment } from "#schema/env.js"

import type { Context } from "./context.ts"

export interface EnvContext extends Context {
  env: Environment
}
