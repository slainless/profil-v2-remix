import { atom } from "jotai"

import { Score } from "#services/sdgs.ts"

export const currentYearAtom = atom<number | null>(null)
export const scoreAtom = atom<Score.Main | null>(null)
