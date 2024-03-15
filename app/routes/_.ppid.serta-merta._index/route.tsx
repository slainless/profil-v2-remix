import type { MetaFunction } from "@remix-run/node"

import { PPIDCategoryPageView } from "#components/PPID/PPIDCategoryPageView.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { PpidType } from "#graphql/graphql.ts"

import { renderCommonMetadata } from "../_/meta.ts"

namespace page {
  export const title = `Informasi Serta Merta`
  export const ogTitle = `Informasi Serta Merta {{ desa_fullname }}`
  export const description = `Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum`
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PPIDSertaMerta() {
  return (
    <PageContainer>
      <PPIDCategoryPageView
        title="Informasi Serta Merta"
        subtitle="Informasi yang dapat mengancam hajat hidup orang banyak dan ketertiban umum."
        type={PpidType.Sertamerta}
      />
    </PageContainer>
  )
}
