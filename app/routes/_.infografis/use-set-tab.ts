import { useSetAtom } from "jotai"
import { useEffect } from "react"

import { currentTabAtom } from "#providers/infography.ts"

export function useSetTab(tab: string) {
  const setTab = useSetAtom(currentTabAtom)
  useEffect(() => {
    setTab(tab)
  }, [tab, setTab])
}
