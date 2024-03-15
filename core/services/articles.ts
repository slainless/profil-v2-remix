import type { Client } from "urql"

import { ArticleTypeValue } from "GraphQL/graphql.ts"

import { articleDetailQuery } from "Queries/articles.ts"

import type { UnderscoredCode } from "Modules/domain-handler"
import { withHeaders } from "Modules/urql.ts"

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
