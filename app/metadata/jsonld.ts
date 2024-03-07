/* eslint-disable @typescript-eslint/no-explicit-any */
import { render as r } from "micromustache"
import type {
  WithContext,
  WebPage,
  BreadcrumbList,
  NewsArticle,
  ListItem,
} from "schema-dts"

import { getLocale } from "Locale/locale.ts"

import type { Article, GalleryItem, Profile, Staff } from "GraphQL/graphql.ts"

import { type Tag, render } from "Modules/template.ts"

export namespace RichDataPreset {
  type CommonArgs = "desa_alias" | "desa_name" | "desa_fullname"
  interface GeneralWebPageOptions {
    title?: Tag<any, CommonArgs>
    desc?: Tag<any, CommonArgs>
    url: string
    profile: Pick<Profile, "alias" | "name">
  }
  export function generalWebPage<T extends GeneralWebPageOptions>({
    profile,
    ...options
  }: T) {
    const locale = getLocale("ID")
    const args = Object.create(null)
    args.desa_name = profile.name.deskel
    args.desa_alias = profile.alias.desa
    args.desa_fullname = r(locale.DESA_PROFILE_FULLNAME, args)

    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: options.url,
      name: options.title
        ? render(options.title, args)
        : r(locale.DESA_PROFILE_WEBSITE_TITLE, args),
      description: options.desc
        ? render(options.desc, args)
        : r(
            `Website resmi {{desa_fullname}}, bekerja sama dengan DIGIDES`,
            args,
          ),
    } satisfies WithContext<WebPage>
  }

  interface BreadcrumbOptions {
    title: string
    url: string
    list?: WithContext<ListItem>[]
  }
  export function breadcrumb({ url, title, list }: BreadcrumbOptions) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      name: title,
      url,
      itemListElement: list,
    } as const satisfies WithContext<BreadcrumbList>
  }

  export function listItem({
    url,
    title,
    position,
  }: Pick<ListItem, "url" | "position"> & { title: string }) {
    return {
      "@context": "https://schema.org",
      "@type": "ListItem",
      url,
      name: title,
      position,
    } as const satisfies WithContext<ListItem>
  }

  interface ArticleProps
    extends Pick<Article, "title" | "short" | "createdAt" | "updatedAt"> {
    thumbnail?: Pick<GalleryItem, "URL"> | null
    user?: Pick<Staff, "name" | "position"> | null
  }
  export function article(
    url: string,
    desa: string,
    _article: ArticleProps,
  ): WithContext<NewsArticle> {
    const locale = getLocale("ID")
    const newsArticle = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: _article.title,
      description: _article.short,
      image: (() => {
        if (_article.thumbnail == null) return
        return [_article.thumbnail.URL]
      })(),
      datePublished: _article.createdAt,
      dateModified: _article.updatedAt,
      author: {
        // TODO: change to org if author is empty (?)
        // TODO: separate person degree/honorific (use honorificPrefix/Suffix instead!)
        "@type": "Person",
        name:
          _article.user?.name ??
          r(locale.ARTICLE_AUTHOR_FALLBACK, { desa_fullname: desa }),
        jobTitle: _article.user?.position,
      },
      publisher: {
        // TODO: need more testing on this
        "@type": "GovernmentOrganization",
        url,
        name: r(locale.DESA_PROFILE_WEBSITE_TITLE, { desa_fullname: desa }),
      },
    } satisfies WithContext<NewsArticle>

    return newsArticle
  }
}
