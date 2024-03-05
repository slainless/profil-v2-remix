"use client"

import { useMemo } from "react"
import rehypeParse from "rehype-parse"
import rehypeRewrite, { RehypeRewriteOptions } from "rehype-rewrite"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"
import { unified } from "unified"

const rewriteOptions: RehypeRewriteOptions = {
  rewrite: (node) => {
    if (node.type == "element") {
      if (node.properties == null) node.properties = {}
      node.properties.target = "_blank"
    }
  },
  selector: "a",
}

const stripper = unified()
  .use(rehypeParse)
  .use(rehypeSanitize, {
    attributes: { "*": [], a: ["href"] },
  })
  .use(rehypeRewrite, rewriteOptions)
  .use(rehypeStringify)

const stripperWithMedia = unified()
  .use(rehypeParse)
  .use(rehypeSanitize, {
    attributes: {
      "*": [],
      img: defaultSchema.attributes?.["img"] ?? [],
      iframe: ["src", "frameBorder"],
      a: ["href"],
    },
    tagNames: [...defaultSchema.tagNames!, "iframe"],
  })
  .use(rehypeRewrite, rewriteOptions)
  .use(rehypeStringify)

export const HTMLRenderer = ({
  children,
  withMedia,
}: {
  children: string
  withMedia?: boolean
}) => {
  const parsed = useMemo(
    () =>
      (withMedia ? stripperWithMedia : stripper)
        .processSync(children)
        .toString(),
    [children, withMedia],
  )

  return (
    <div
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{
        __html: parsed,
      }}
    ></div>
  )
}
