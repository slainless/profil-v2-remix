import type { Client } from "urql"

import { ArticleTypeValue } from "#graphql/graphql.ts"

import { articleDetailQuery } from "#queries/articles.ts"

import type { UnderscoredCode } from "#modules/domain-handler.ts"
import { withHeaders } from "#modules/urql.ts"

export const getArticle = (
  client: Client,
  schema: UnderscoredCode,
  slug: string,
  type?: ArticleTypeValue,
) => {
  return client.query(articleDetailQuery, { slug, type }, withHeaders(schema))
}

export const mustGetArticle = async (
  ...args: Parameters<typeof getArticle>
) => {
  const { data, error } = await getArticle(...args)
  if (error != null) throw error
  if (data?.article == null) throw new Response(null, { status: 404 })
  return data.article
}
