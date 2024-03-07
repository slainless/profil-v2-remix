import { atom } from "jotai"

import { IDM } from "Services/idm"

export const currentYearAtom = atom(0)

export const IDMsAtom = atom([] as IDM.Main[])
export const latestIDMAtom = atom<IDM.Main | null>((get) => {
  return get(IDMsAtom)[0] ?? null
})
