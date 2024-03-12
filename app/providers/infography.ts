import { atom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"

export const currentTabAtom = atom("")

export const TabHydrator = ({ currentTab }: { currentTab: string }) => {
  useHydrateAtoms([[currentTabAtom, currentTab]], {
    dangerouslyForceHydrate: true,
  })

  return null
}
