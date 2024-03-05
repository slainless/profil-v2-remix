import { atom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { render } from "micromustache"

import { getLocale } from "Locale/locale.ts"

import type { ProfileQuery } from "GraphQL/graphql.ts"

import type { UnderscoredCode } from "Modules/domain-handler.ts"

export const profileAtom = atom<NonNullable<ProfileQuery["profile"]>>(
  Object.create(null),
)
export const aliasDesaAtom = atom<string>((get) => get(profileAtom).alias.desa)
export const namaDesaAtom = atom<string>((get) => get(profileAtom).name.deskel)
export const desaAtom = atom<string>((get) =>
  render(getLocale("ID").DESA_PROFILE_FULLNAME, {
    desa_alias: get(aliasDesaAtom),
    desa_name: get(namaDesaAtom),
  }),
)

export const schemaAtom = atom<UnderscoredCode>("99_99_99_9999")
export const subdomainAtom = atom("demo")
export const baseDomainAtom = atom("localhost")

interface ProfileHydratorProps {
  profile: NonNullable<ProfileQuery["profile"]>
  schema: string
  subdomain: string
  baseDomain: string
}
export function ProfileHydrator({
  profile,
  schema,
  subdomain,
  baseDomain,
}: ProfileHydratorProps) {
  // @ts-expect-error idk
  useHydrateAtoms(
    [
      [profileAtom, profile],
      [schemaAtom, schema],
      [subdomainAtom, subdomain],
      [baseDomainAtom, baseDomain],
    ],
    {
      // dangerouslyForceHydrate: true
    },
  )

  return null
}
