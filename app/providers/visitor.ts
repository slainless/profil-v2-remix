import { atom } from "jotai"

import { GetVisitCountQuery } from "GraphQL/codegen/graphql"

export const visitStatisticAtom = atom<GetVisitCountQuery["stats"] | null>(null)
