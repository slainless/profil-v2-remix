import { createStore, Provider } from 'jotai'
import { createElement, type PropsWithChildren } from 'react'

export const globalStore = createStore()
export function JotaiGlobalStore(props: PropsWithChildren) {
  return createElement(Provider, props)
}
