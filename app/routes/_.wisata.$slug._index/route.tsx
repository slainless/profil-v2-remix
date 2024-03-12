import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useAtomValue } from "jotai"
import { render } from "micromustache"
import normalizeUrl from "normalize-url"
import invariant from "tiny-invariant"
import type { RequiredDeep } from "type-fest"
import urlJoin from "url-join"

import { ArticleHeader } from "Components/Article/ArticleHeader.tsx"
import { ArticleRenderer } from "Components/Article/ArticleRenderer.tsx"
import ShareArticle from "Components/ButtonShare.tsx"

import { desaAtom } from "Providers/profile.ts"

import { getLocale } from "Locale/locale.ts"

import { ArticleTypeValue } from "GraphQL/graphql.ts"

import { mustGetArticle } from "Services/.server/articles.ts"
import { mustNormalizeContext } from "Services/.server/context.ts"
import { asset } from "Services/assets.ts"

import { stripURL } from "Modules/url.ts"

import { Layout } from "../_.berita.$slug._index/Layout.tsx"
import {
  renderArticleRichData,
  renderMetadata,
} from "../_.berita.$slug._index/meta.ts"
import { page as parentPage } from "../_.berita._index/meta.ts"
import { createDescription, createTitle } from "../_/meta-utils.ts"
import { renderDescription, renderTitle } from "../_/meta.ts"

export async function loader({ context, params }: LoaderFunctionArgs) {
  const ctx = mustNormalizeContext(context)
  const baseUrl = stripURL(ctx.canonUrl)
  const slug = params["slug"]
  invariant(slug, "Slug is not defined")

  const article = await mustGetArticle(
    context.gqlClient,
    ctx.schema,
    slug,
    ArticleTypeValue.Tourism,
  )

  return {
    ...ctx,
    article,
    baseUrl,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const _data = data as RequiredDeep<typeof data>
  const { profile, article } = _data
  const locale = getLocale("ID")

  const title = createTitle(locale, profile, article.title)
  const description = createDescription(locale, profile, article.short)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(locale, _data),
    ...renderArticleRichData(locale, _data),
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
