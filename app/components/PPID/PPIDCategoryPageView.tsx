import { Breadcrumbs, ActionIcon, Stack, Title, Text } from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconHome } from "@tabler/icons-react"
import { Fragment } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import type { PpidType } from "GraphQL/graphql.ts"

import { PPIDCategoryAccordion } from "./PPIDCategoryAccordion.tsx"

interface Props {
  title: string
  subtitle: string
  type: PpidType
}

export const PPIDCategoryPageView = ({ title, subtitle, type }: Props) => {
  return (
    <Fragment>
      <Breadcrumbs separatorMargin={2} hiddenFrom="sm">
        <ActionIcon variant="transparent" component={Link} to={"/"}>
          <IconHome size={20} color="#000" />
        </ActionIcon>
        <Text fz={14} c={"#000"}>
          <Link to={"/ppid"} style={{ textDecoration: "none" }}>
            PPID
          </Link>
        </Text>
      </Breadcrumbs>
      <Stack gap={50} mt={20}>
        <Stack gap={0}>
          <Title fz={{ base: 20, sm: 44 }} c={vars("color-primary-4")}>
            {title}
          </Title>
          <Text fz={{ base: "md", sm: 20 }}>{subtitle}</Text>
        </Stack>
        <PPIDCategoryAccordion type={type} />
      </Stack>
    </Fragment>
  )
}
