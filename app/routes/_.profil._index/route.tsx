import { Stack, Box } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"
import PemdesStructure from "#components/Profile/PemdesStructure.tsx"
import PetaLokasi from "#components/Profile/PetaLokasi.tsx"
import SejarahDesa from "#components/Profile/SejarahDesa.tsx"
import VisiMisi from "#components/Profile/VisiMisi.tsx"

import { ProfileLoader } from "#providers/desa-profile.ts"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderCommonMetadata } from "../_/meta.ts"

export namespace page {
  export const title = "Profil"
  export const ogTitle = "Profil {{ desa_fullname }}"
  export const description =
    // TODO: desa_alias here should be lowercased
    "Informasi profil, sejarah, visi dan misi, batas-batas {{ desa_alias }}, dan struktur pemerintahan {{ desa_fullname }}"
}

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/profil")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function Profile() {
  return (
    <PageContainer>
      <ProfileLoader />
      <Stack gap={100}>
        <VisiMisi />
        <Box mt={{ base: -83, sm: 0 }}>
          <PemdesStructure />
        </Box>
        <Box mt={{ base: -83, sm: 0 }}>
          <SejarahDesa />
        </Box>
        <Box mt={{ base: -65, sm: 0 }}>
          <PetaLokasi />
        </Box>
      </Stack>
    </PageContainer>
  )
}
