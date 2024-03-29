import { render } from "micromustache"

import type { Locale } from "#locale/locale.ts"

import type { Profile } from "#graphql/graphql.ts"

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

const documentTitle = (
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

export const createTitle = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name">,
  regularTitle?: string,
  ogTitle?: string,
  desa_fullname?: string,
) => {
  const desa = desaFullname(locale, profile, desa_fullname)
  let docTitle, pageTitle: string
  if (
    (regularTitle == null || regularTitle === "") &&
    (ogTitle == null || ogTitle === "")
  )
    docTitle = pageTitle = websiteTitle(locale, profile, desa)
  else {
    const args = {
      desa_name: profile.name.deskel,
      desa_alias: profile.alias.desa,
      desa_fullname: desa,
    }
    pageTitle = render((ogTitle ?? regularTitle)!, args)
    docTitle = documentTitle(
      locale,
      profile,
      render((regularTitle ?? ogTitle)!, args),
      desa,
    )
  }

  return { pageTitle, documentTitle: docTitle }
}

export const createDescription = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name" | "description">,
  description?: string,
  desa_fullname?: string,
) => {
  const desa = desaFullname(locale, profile, desa_fullname)
  if (description != null && description !== "")
    return render(description, {
      desa_name: profile.name.deskel,
      desa_alias: profile.alias.desa,
      desa_fullname: desa,
    })

  return profile.description == null ||
    profile.description === "" ||
    profile.description == "[Deskripsi desa]"
    ? render(locale.DESA_PROFILE_DESCRIPTION_FALLBACK, {
        desa_fullname: desa,
      })
    : profile.description
}

export const orgName = (
  locale: Loc,
  profile: Pick<Profile, "alias" | "name">,
  desa_fullname?: string,
): typeof Locale.ID.DESA_PROFILE_ORGANIZATION_NAME =>
  // @ts-expect-error ...
  render(locale.DESA_PROFILE_ORGANIZATION_NAME, {
    desa_fullname: desaFullname(locale, profile, desa_fullname),
  })
