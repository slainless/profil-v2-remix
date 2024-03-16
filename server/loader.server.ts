import type { Environment } from "#schema/env.js"
import type { Client } from "urql"

import type { Context } from "./context.ts"
import { createGQLClient } from "./gql.ts"

export interface ServerContext extends Context {
  gqlClient: Client
}

export function createServerContext(env: Environment) {
  return {
    gqlClient: createGQLClient(env),
  }
}
