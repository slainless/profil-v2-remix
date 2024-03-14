import type { MetaArgs } from "@remix-run/node"
import normalizeUrl from "normalize-url"
import type { Article, WithContext } from "schema-dts"
import urlJoin from "url-join"

import { type Locale } from "Locale/locale.ts"

import { asset } from "Services/assets.ts"

import { richData } from "Modules/metadata.ts"

import { orgName } from "../_/meta-utils.ts"
import {
  createMetadata as crtMetadata,
  renderMetadata as rdrMetadata,
} from "../_/meta.ts"
import type { loader } from "./route.tsx"

type Data = NonNullable<MetaArgs<typeof loader>["data"]>
type LocaleType = Record<keyof typeof Locale.ID, string>
export function renderMetadata(
  locale: LocaleType,
  data: Data,
  overrides?: Parameters<typeof crtMetadata>[2],
) {
  const { article, schema } = data
  const metadata = crtMetadata(locale, data, {
    "og:type": "article",
    // "article:author": "https://...", // url to author's page, none/unimplemented at the moment...
    "article:modified_time": article.updatedAt,
    "article:published_time": article.createdAt,
    // "article:section": "",
    // "article:tag": [],
    author: article.user?.name,
    image: article.thumbnail?.URL
      ? [
          {
            "og:image:url": asset.gallery({
              schema,
              file: article.thumbnail.URL,
            }),
            "og:image:alt": article.title,
          },
        ]
      : [],
    ...overrides,
  })

  return rdrMetadata(metadata)
}

export function renderArticleRichData(locale: LocaleType, data: Data) {
  const { article, schema, profile, canonUrl } = data
  return [
    richData({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      image: article.thumbnail?.URL
        ? [asset.gallery({ schema, file: article.thumbnail.URL })]
        : [],
      datePublished: article.createdAt,
      dateModified: article.updatedAt,
      author: article.user?.name
        ? [
            {
              "@type": "Person",
              name: article.user.name,
            },
          ]
        : [],
      publisher: {
        "@type": "GovernmentOrganization",
        name: orgName(locale, profile),
        url: normalizeUrl(urlJoin(canonUrl, "../../")),
      },
    } satisfies WithContext<Article>),
  ]
}
