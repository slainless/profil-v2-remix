import { Stack, Title, Text } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import { vars } from "#theme/artifact/vars.mjs"

import { PPIDRequestForm } from "#components/PPID/PPIDRequestForm.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { page as parentPage } from "../_.ppid._index/meta.ts"
import { renderCommonMetadata } from "../_/meta.ts"

export namespace page {
  export const title = `Permohonan Informasi`
  export const ogTitle = `Form Permohonan Informasi {{ desa_fullname }}`
  export const description = parentPage.description
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PPIDPermintaanForm() {
  return (
    <PageContainer>
      <Stack gap={50}>
        <Stack gap={0}>
          <Title fz={{ base: 20, sm: 44 }} c={vars("color-primary-4")}>
            FORM PERMOHONAN INFORMASI
          </Title>
          <Text fz={{ base: "md", sm: 20 }}>
            Harap mengisi form untuk permohonan informasi
          </Text>
        </Stack>
        <PPIDRequestForm />
      </Stack>
    </PageContainer>
  )
}
