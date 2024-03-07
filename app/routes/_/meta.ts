import type { MetaArgs } from "@remix-run/node"

import {
  desaFullname,
  description,
  websiteTitle,
  documentTitle,
  orgName,
} from "Metadata/utils.ts"

import type { Locale } from "Locale/locale.ts"

import { asset } from "Services/assets.ts"

import { link, type Base } from "Modules/metadata.ts"

import type { loader } from "./route.tsx"

/* -------------------------------------------------------------------------- */
/*                              Standard Metadata                             */
/* -------------------------------------------------------------------------- */

type LocaleType = Record<keyof typeof Locale.ID, string>
export type LoaderData = NonNullable<MetaArgs<typeof loader>["data"]>
export const standard = (locale: LocaleType, { profile }: LoaderData) => {
  const desa_fullname = desaFullname(locale, profile)
  return {
    title: documentTitle(locale, profile, desa_fullname),
    description: description(locale, profile, desa_fullname),
    robots: ["index", "follow"],
    publisher: orgName(locale, profile, desa_fullname),
    "application-name": "Website Profile Desa by DIGIDES",
    generator: "Remix",
  } satisfies Partial<Base.Standard>
}

export const favicon = ({ schema, profile }: LoaderData) =>
  link("icon", asset.logo16({ schema, file: profile.logoURL }))

/* -------------------------------------------------------------------------- */
/*                                 Open Graph                                 */
/* -------------------------------------------------------------------------- */

export const openGraph = (
  locale: LocaleType,
  { canonUrl, profile, schema }: LoaderData,
) => {
  const desa_fullname = desaFullname(locale, profile)
  return {
    "og:title": websiteTitle(locale, profile, desa_fullname),
    "og:description": description(locale, profile, desa_fullname),
    "og:url": canonUrl,
    "og:site_name": websiteTitle(locale, profile, desa_fullname),
    image: [
      {
        "og:image:url": asset.logo300({ schema, file: profile.logoURL }),
        "og:image:width": 256,
        "og:image:height": 256,
        "og:image:alt": `Logo ${desa_fullname}`,
      },
    ],
    "og:locale": "id_ID",
    "og:type": "website",
  } satisfies Partial<Base.WebsiteGraph>
}
