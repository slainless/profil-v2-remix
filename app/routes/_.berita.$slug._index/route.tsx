import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useAtomValue } from "jotai"
import { render } from "micromustache"
import normalizeUrl from "normalize-url"
import invariant from "tiny-invariant"
import urlJoin from "url-join"

import { ArticleHeader } from "#components/Article/ArticleHeader.tsx"
import { ArticleRenderer } from "#components/Article/ArticleRenderer.tsx"
import ShareArticle from "#components/ButtonShare.tsx"

import { desaAtom } from "#providers/profile.ts"

import { getLocale } from "#locale/locale.ts"

import { ArticleTypeValue } from "#graphql/graphql.ts"

import { mustGetArticle } from "#services/articles.ts"
import { asset } from "#services/assets.ts"

import { stripURL } from "#modules/url.ts"

import { mustGetCommonContext } from "#server/context.ts"

import { page as parentPage } from "../_.berita._index/meta.ts"
import { createDescription, createTitle } from "../_/meta-utils.ts"
import { renderDescription, renderTitle } from "../_/meta.ts"
import { Layout } from "./Layout.tsx"
import { renderArticleRichData, renderMetadata } from "./meta.ts"

export async function loader({ context, params }: LoaderFunctionArgs) {
  const ctx = mustGetCommonContext(context)
  const baseUrl = stripURL(ctx.canonUrl)
  const slug = params["slug"]
  invariant(slug, "Slug is not defined")

  const article = await mustGetArticle(
    ctx.gqlClient,
    ctx.schema,
    slug,
    ArticleTypeValue.General,
  )

  return {
    ...ctx,
    article,
    baseUrl,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data == null) return []
  const { profile, article } = data
  const locale = getLocale("ID")

  const title = createTitle(locale, profile, article.title)
  const description = createDescription(locale, profile, article.short)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(locale, data),
    ...renderArticleRichData(locale, data),
  ]
}

export default function NewsRead() {
  const locale = getLocale("ID")
  const data = useLoaderData<typeof loader>()
  const { article, baseUrl, schema } = data as Required<typeof data>
  const desa_fullname = useAtomValue(desaAtom)
  return (
    <Layout.Root>
      <Layout.Content>
        <ArticleHeader
          title={article.title}
          authorName={
            article.user?.name ??
            render(locale.ARTICLE_AUTHOR_FALLBACK, { desa_fullname })
          }
          backLinkTitle={render(parentPage.ogTitle, { desa_fullname })}
          backLinkURL={normalizeUrl(urlJoin(baseUrl, "../"))}
          createdAt={article.createdAt}
          thumbnailURL={asset.gallery({ schema, file: article.thumbnail?.URL })}
          thumbnailAlt={article.thumbnail?.caption}
          views={article.views}
        />
        <ArticleRenderer mt={24}>{article.content}</ArticleRenderer>
        <ShareArticle articleUrl={baseUrl} />
      </Layout.Content>
      <Layout.Sidebar
        article={article}
        baseUrl={normalizeUrl(urlJoin(baseUrl, "../"))}
        moreText={`Berita Terbaru`}
      />
    </Layout.Root>
  )
}
