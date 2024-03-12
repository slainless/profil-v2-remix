import { Stack, Grid, Title, Group, Tabs, Text, Image } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import { useAtom, useAtomValue } from "jotai"
import { useEffect } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { SDGsCard } from "Components/Infography/SDGs/SDGsCard.tsx"
import { SDGsGoalModal } from "Components/Infography/SDGs/SDGsGoalModal.tsx"

import { scoreAtom } from "Providers/SDGs.ts"
import { schemaAtom, aliasDesaAtom, namaDesaAtom } from "Providers/profile.ts"

import otherImage from "Assets/other-2.png"

import { getSDGsScore } from "Services/sdgs.ts"

import { renderMetadata } from "../_.infografis/meta.ts"
import { useSetTab } from "../_.infografis/use-set-tab.ts"

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "sdgs")
}

export default function SDGsView() {
  useSetTab("sdgs")
  const [score, setScore] = useAtom(scoreAtom)
  const schema = useAtomValue(schemaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const namaDesa = useAtomValue(namaDesaAtom)

  useEffect(() => {
    getSDGsScore(schema).then((v) => setScore(v))
  }, [schema, setScore])

  return (
    <Tabs.Panel value="sdgs">
      <Stack gap={50}>
        <SDGsGoalModal />
        <Grid justify="center" align="center" visibleFrom="sm">
          <Grid.Col span={6}>
            <Stack>
              <Title fz={44} order={1} c={vars("color-primary-4")}>
                SDGs {aliasDesa}
              </Title>
              <Text fz={20}>
                SDGs{" "}
                <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>{" "}
                mengacu pada upaya yang dilakukan di tingkat{" "}
                <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
                untuk mencapai Tujuan Pembangunan Berkelanjutan (Sustainable
                Development Goals/SDGs). SDGs merupakan agenda global yang
                ditetapkan oleh Perserikatan Bangsa-Bangsa (PBB) untuk mengatasi
                berbagai tantangan sosial, ekonomi, dan lingkungan di seluruh
                dunia
              </Text>
              <Grid
                w={"80%"}
                p={20}
                justify="center"
                align="center"
                gutter={"xl"}
                bg={"rgba(255, 255, 255, 0.50)"}
                style={{
                  boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.10)",
                  borderRadius: "5px",
                  backdropFilter: "blur(2px)",
                }}
              >
                <Grid.Col span={6}>
                  <Text fz={24} fw={700} ta={"start"}>
                    Skor SDGs {aliasDesa} {namaDesa}
                  </Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text c="#545454" fz={60} fw={800} ta={"end"}>
                    {score?.average}
                  </Text>
                </Grid.Col>
              </Grid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group justify="flex-end">
              <Image maw={500} src={otherImage} alt="SDGS" />
            </Group>
          </Grid.Col>
        </Grid>

        <Grid justify="center" style={{ overflow: "visible" }}>
          {score?.data != null
            ? score.data.map((score) => (
                <Grid.Col
                  span={{ base: 12, xs: 6, sm: 4, lg: 3 }}
                  key={score.title}
                >
                  <SDGsCard
                    title={score.title}
                    imageSrc={score.image}
                    value={score.score}
                    id={score.goals}
                  />
                </Grid.Col>
              ))
            : ""}
        </Grid>
      </Stack>
    </Tabs.Panel>
  )
}
