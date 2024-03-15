import { atom } from "jotai"

import { GetVisitCountQuery } from "#graphql/graphql.ts"

export const visitStatisticAtom = atom<GetVisitCountQuery["stats"] | null>(null)
