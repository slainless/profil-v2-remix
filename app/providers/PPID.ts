import { atom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { PartialDeep } from "type-fest"
import { useQuery } from "urql"

import type {
  PpidCategoriesQuery,
  PpidFile,
  PpidType,
} from "#graphql/graphql.ts"

import { PPIDCategoriesQuery } from "#queries/PPID.ts"

export const PPIDCategoriesAtom = atom<PpidCategoriesQuery["categories"]>([])

export const PPIDCategoriesMapAtom = atom((get) => {
  const map: Record<PpidType, PpidCategoriesQuery["categories"]> =
    Object.create(null)
  for (const category of get(PPIDCategoriesAtom)) {
    if (map[category.type] == null) map[category.type] = []

    map[category.type].push(category)
  }

  return map
})

export const PPIDItemsAtom = atom<Record<string, PartialDeep<PpidFile>>>({})

export const PPIDCategoryProvider = () => {
  const setPPIDCategories = useSetAtom(PPIDCategoriesAtom)
  const [{ data }] = useQuery({ query: PPIDCategoriesQuery })
  useEffect(() => {
    if (data?.categories != null) setPPIDCategories(data.categories)
  }, [data, setPPIDCategories])

  return null
}
