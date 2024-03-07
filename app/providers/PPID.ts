import { atom } from "jotai"
import { PartialDeep } from "type-fest"

import {
  GetPpidCategoriesQuery,
  PpidFile,
  PpidType,
} from "GraphQL/codegen/graphql"

export const PPIDCategoriesAtom = atom<GetPpidCategoriesQuery["categories"]>([])

export const PPIDCategoriesMapAtom = atom((get) => {
  // @ts-expect-error
  const map: Record<PpidType, GetPpidCategoriesQuery["categories"]> = {}
  for (const category of get(PPIDCategoriesAtom)) {
    if (map[category.type] == null) {
      map[category.type] = []
    }

    map[category.type].push(category)
  }

  return map
})

export const PPIDItemsAtom = atom<Record<string, PartialDeep<PpidFile>>>({})
