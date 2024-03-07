import { render } from "micromustache"

import type { Locale } from "Locale/locale.ts"

import type { Profile } from "GraphQL/graphql.ts"

type Loc = Record<keyof typeof Locale.ID, string>
export const desaFullname = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name">,
  desa_fullname?: string,
): typeof Locale.ID.DESA_PROFILE_FULLNAME =>
  // @ts-expect-error ...
  desa_fullname
    ? desa_fullname
    : render(locale.DESA_PROFILE_FULLNAME, {
        desa_alias: profile.alias.desa,
        desa_name: profile.name.deskel,
      })

export const websiteTitle = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name">,
  desa_fullname?: string,
): typeof Locale.ID.DESA_PROFILE_WEBSITE_TITLE =>
  // @ts-expect-error ...
  render(locale.DESA_PROFILE_WEBSITE_TITLE, {
    desa_fullname: desaFullname(locale, profile, desa_fullname),
  })

export const documentTitle = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name">,
  page_name: string,
  desa_fullname?: string,
): typeof Locale.ID.DESA_PROFILE_PAGE_TITLE =>
  // @ts-expect-error ...
  render(locale.DESA_PROFILE_PAGE_TITLE, {
    page_name,
    desa_fullname: desaFullname(locale, profile, desa_fullname),
  })

export const description = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name" | "description">,
  desa_fullname?: string,
): typeof Locale.ID.DESA_PROFILE_DESCRIPTION_FALLBACK =>
  // @ts-expect-error ...
  profile.description == null ||
  profile.description === "" ||
  profile.description == "[Deskripsi desa]"
    ? render(locale.DESA_PROFILE_DESCRIPTION_FALLBACK, {
        desa_fullname: desaFullname(locale, profile, desa_fullname),
      })
    : profile.description

export const orgName = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name">,
  desa_fullname?: string,
): typeof Locale.ID.DESA_PROFILE_ORGANIZATION_NAME =>
  // @ts-expect-error ...
  render(locale.DESA_PROFILE_ORGANIZATION_NAME, {
    desa_fullname: desaFullname(locale, profile, desa_fullname),
  })
