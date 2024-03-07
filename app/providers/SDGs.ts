import { atom } from "jotai"

import { Score } from "Services/sdgs"

export const currentYearAtom = atom<number | null>(null)
export const scoreAtom = atom<Score.Main | null>(null)
