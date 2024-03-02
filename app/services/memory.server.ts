import type { DomainHandler } from 'Modules/domain-handler.js'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import invariant from 'tiny-invariant'

export interface Memory {
  domain: DomainHandler
  gqlClient: ApolloClient<NormalizedCacheObject>
}

export function setMemory(memory: Memory) {
  // @ts-expect-error arbitrary assignment to global
  global['memory'] = memory
}

export function memory(): Memory {
  // @ts-expect-error arbitrary property access to global
  invariant(global['memory'], "Global memory store is not found!")
  // @ts-expect-error ...
  return global['memory']
}

