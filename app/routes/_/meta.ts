/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MetaArgs } from "@remix-run/node"
import type { WritableDeep } from "type-fest"

import { getLocale, type Locale } from "Locale/locale.ts"

import { asset } from "Services/assets.ts"

import {
  link,
  Base,
  metadatas,
  createMedia,
  create,
  robots,
  title,
  metadata,
} from "Modules/metadata.ts"
import { stripURL } from "Modules/url.ts"

import { mustGetRootLayoutData } from "./data.ts"
import {
  desaFullname,
  orgName,
  websiteTitle,
  createTitle,
  createDescription,
} from "./meta-utils.ts"
import type { loader } from "./route.tsx"

/* -------------------------------------------------------------------------- */
/*                              Standard Metadata                             */
/* -------------------------------------------------------------------------- */

type LocaleType = Record<keyof typeof Locale.ID, string>
export type LoaderData = NonNullable<MetaArgs<typeof loader>["data"]>

type OpenGraph = Base.WebsiteGraph | Base.ArticleGraph | Base.ProfileGraph
export type Metadata = {
  desa_alias: string
  desa_name: string
  desa_fullname: string
  favicon: ReturnType<typeof link>
  canonical: ReturnType<typeof link>
} & Partial<Base.Standard & OpenGraph>

export const createMetadata = <T extends Partial<Base.Standard & OpenGraph>>(
  locale: LocaleType,
  data: LoaderData,
  overrides?: T,
) => {
  const desa_fullname = desaFullname(locale, data.profile)
  const metadata = {
    desa_fullname,
    desa_alias: data.profile.alias.desa,
    desa_name: data.profile.name.deskel,

    canonical: link("canonical", data.canonUrl),

    robots: ["index", "follow"],
    "application-name": "Website Profile Desa by DIGIDES",
    generator: "Remix",
    publisher: orgName(locale, data.profile, desa_fullname),

    favicon: favicon(data),

    "og:url": stripURL(data.canonUrl),
    "og:site_name": websiteTitle(locale, data.profile, desa_fullname),
    image: [
      {
        "og:image:url": asset.logo300({
          schema: data.schema,
          file: data.profile.logoURL,
        }),
        "og:image:width": 256,
        "og:image:height": 256,
        "og:image:alt": `Logo ${desa_fullname}`,
      },
    ],
    "og:locale": "id_ID",
    "og:type": "website",
    ...overrides,
  } as const satisfies Metadata

  return metadata as WritableDeep<typeof metadata>
}

export const renderMetadata = (metadata: Metadata) => {
  const {
    desa_fullname,
    desa_alias,
    desa_name,
    image,
    video,
    audio,
    favicon,
    canonical,
    robots: robs,
    "og:locale:alternate": localeAlternate,
    // @ts-expect-error ...
    "article:author": articleAuthor,
    // @ts-expect-error ...
    "article:tag": articleTag,
    ...props
  } = metadata
  return [
    favicon,
    canonical,
    robs ? robots(robs) : [],
    ...metadatas("og:locale:alternate", localeAlternate),
    ...metadatas("article:author", articleAuthor),
    ...metadatas("article:tag", articleTag),
    ...createMedia(image),
    ...createMedia(audio),
    ...createMedia(video),
    ...create(props),
  ]
}

export const favicon = ({ schema, profile }: LoaderData) =>
  link("icon", asset.logo16({ schema, file: profile.logoURL }))

export { createTitle, createDescription } from "./meta-utils.ts"
export const renderTitle = ({
  pageTitle,
  documentTitle,
}: ReturnType<typeof createTitle>) => [
  title(documentTitle),
  metadata("og:title", pageTitle),
]
export const renderDescription = (desc: string) => [
  metadata("description", desc),
  metadata("og:description", desc),
]

export interface Page {
  title: string
  ogTitle: string
  description: string
}
export function renderCommonMetadata(data: MetaArgs, page: Page) {
  const parentData = mustGetRootLayoutData(data.matches)
  const { profile } = parentData
  const locale = getLocale("ID")

  const title = createTitle(locale, profile, page.title, page.ogTitle)
  const description = createDescription(locale, profile, page.description)
  const metadata = createMetadata(locale, parentData)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(metadata),
  ]
}
