"use client"

import { Grid, Title, TabsList, ScrollArea } from "@mantine/core"
import { useAtomValue } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { aliasDesaAtom, namaDesaAtom, schemaAtom } from "Providers/profile.ts"

import { DomainHandler } from "Modules/domain-handler.ts"

import { tabMapping } from "./Tabs.mapping.ts"
import { Icon, Tab } from "./Tabs.tsx"

export const Header = () => {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const namaDesa = useAtomValue(namaDesaAtom)
  const schema = useAtomValue(schemaAtom)
  const filteredTabs = Object.entries(tabMapping).filter(
    ([, tab]) =>
      (!tab.onlyDesa && !tab.onlyKel) ||
      (DomainHandler.isKelurahan(schema) && tab.onlyKel) ||
      (!DomainHandler.isKelurahan(schema) && tab.onlyDesa),
  )

  return (
    <>
      <ScrollArea w={"90vw"} type="never">
        <TabsList m={"auto"} w={600} c={"#5A5E62"} grow hiddenFrom="sm" mb={30}>
          {filteredTabs.map(([key, tab]) => (
            <Tab value={key} icon={<Icon as={tab.icon} />} key={key}>
              {tab.tabTitle}
            </Tab>
          ))}
        </TabsList>
      </ScrollArea>

      <Grid visibleFrom="sm" justify="center" align="center" gutter={"xs"} grow>
        <Grid.Col span={5}>
          <Title tt={"uppercase"} fz={44} c={vars("color-primary-5")}>
            INFOGRAFIS
            <br />
            {aliasDesa} {namaDesa}
          </Title>
        </Grid.Col>
        <Grid.Col span={7}>
          <TabsList c={"#5A5E62"} grow>
            {filteredTabs.map(([key, tab]) => (
              <Tab value={key} icon={<Icon as={tab.icon} />} key={key}>
                {tab.tabTitle}
              </Tab>
            ))}
          </TabsList>
        </Grid.Col>
      </Grid>
    </>
  )
}
export { Panel } from "./Tabs.tsx"
export { Tabs } from "./Tabs.tsx"
