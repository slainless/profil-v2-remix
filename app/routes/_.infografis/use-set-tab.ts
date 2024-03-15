import { currentTabAtom } from "#providers/infography.ts"
import { useSetAtom } from "jotai"
import { useEffect } from "react"

export function useSetTab(tab: string) {
  const setTab = useSetAtom(currentTabAtom)
  useEffect(() => {
    setTab(tab)
  }, [tab, setTab])
}
