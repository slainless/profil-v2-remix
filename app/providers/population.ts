import { atom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { useQuery } from "urql"

import type { PopulationStatistic } from "#graphql/graphql.ts"

import { populationStatisticQuery } from "#queries/population.ts"

export const populationStatisticAtom = atom<PopulationStatistic | null>(null)

export const PopulationStatisticLoader = () => {
  const setPopulationStatistic = useSetAtom(populationStatisticAtom)
  const [{ data }] = useQuery({ query: populationStatisticQuery })
  useEffect(() => {
    setPopulationStatistic(data?.stats ?? null)
  }, [data, setPopulationStatistic])
  return null
}
