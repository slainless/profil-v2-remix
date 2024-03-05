import { createStore, Provider } from "jotai"
import { createElement, type PropsWithChildren } from "react"

export const globalStore = createStore()
export function JotaiGlobalStore({ children }: PropsWithChildren) {
  return createElement(Provider, { store: globalStore }, [children])
}
