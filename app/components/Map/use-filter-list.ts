import Fuse from "fuse.js"
import { useState, useMemo } from "react"

import { PointOfInterest } from "#graphql/graphql.ts"

import { centerOfIndonesia } from "#modules/geojson-utils.ts"

export function useFilterList<
  T extends Pick<
    PointOfInterest,
    "category" | "title" | "description" | "point"
  >,
>(items: T[]) {
  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")

  const filteredByCategory = useMemo(() => {
    return items.filter(
      (v) =>
        (category == null || (category != null && v.category === category)) &&
        (v.point.latitude != centerOfIndonesia.latitude ||
          v.point.longitude != centerOfIndonesia.longitude),
    )
  }, [items, category])

  const filteredBySearch = useMemo(() => {
    if (search == "") return filteredByCategory
    const results = new Fuse(filteredByCategory, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "description", weight: 0.3 },
        { name: "category", weight: 0.2 },
      ],
    }).search(search)

    return results.map((item) => item.item)
  }, [filteredByCategory, search])

  return { search: setSearch, setCategory, result: filteredBySearch }
}
