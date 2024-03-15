import { atom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { useQuery } from "urql"

import type { DesaProfileQuery } from "#graphql/graphql.ts"

import { desaProfileQuery } from "#queries/profile.ts"

export const desaProfileAtom = atom<DesaProfileQuery["profile"] | null>(null)

export const ProfileLoader = () => {
  const [{ data }] = useQuery({ query: desaProfileQuery })
  const setClientProfile = useSetAtom(desaProfileAtom)
  useEffect(() => {
    setClientProfile(data?.profile)
  }, [data, setClientProfile])

  return null
}
