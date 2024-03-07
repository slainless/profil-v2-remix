import {
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  ModalRoot,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  Image,
  Group,
  Stack,
} from "@mantine/core"
import { useAtomValue } from "jotai"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"

import { usePathHash } from "Components/Hooks/use-path-hash.ts"

import { scoreAtom } from "Providers/SDGs.ts"
import { schemaAtom } from "Providers/profile.ts"

import { Goal, getSDGsGoal } from "Services/sdgs.ts"

import { SDGsRecommendationTable } from "./SDGsRecommendationTable.tsx"
import { SDGsTargetTable } from "./SDGsTargetTable.tsx"

const regexpGoalHash = /^#goal-(\d{1,3})$/

export const SDGsGoalModal = () => {
  const schema = useAtomValue(schemaAtom)

  const score = useAtomValue(scoreAtom)
  const hash = usePathHash()
  const goalIndex = useMemo(() => regexpGoalHash.exec(hash)?.[1], [hash])
  const opened = useMemo(() => goalIndex != null, [goalIndex])
  const onClose = useCallback(() => {
    typeof window != "undefined" && (window.location.hash = " ")
  }, [])

  const goal = useMemo(
    () => score?.data?.find((goal) => goal.goals === +(goalIndex ?? -1)),
    [score, goalIndex],
  )

  const [detail, setDetail] = useState<Goal.Main | null>(null)
  useEffect(() => {
    if (goal == null) return
    const controller = new AbortController()
    const { signal } = controller
    getSDGsGoal(schema, goalIndex!, signal).then((detail) => setDetail(detail))

    return () => {
      controller.abort("sdgs modal unmounted, aborting fetch")
    }
  }, [goal, schema, goalIndex])

  // cleanup hash residue...
  useLayoutEffect(() => {
    if (window.location.hash == "#%20") {
      history.replaceState(null, "", " ")
    }
  }, [hash])

  return (
    <ModalRoot
      opened={opened}
      onClose={onClose}
      size="auto"
      zIndex={9999}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <ModalOverlay />
      <ModalContent>
        <Tabs
          defaultValue="recommendation"
          allowTabDeactivation={false}
          variant="default"
        >
          <ModalHeader>
            <Stack w="100%" gap="sm">
              <Group>
                <Image
                  src={goal?.image}
                  alt={goal?.title}
                  mah={50}
                  maw={50}
                  mr="sm"
                />
                <ModalTitle>{goal?.title}</ModalTitle>
                <ModalCloseButton />
              </Group>
              <TabsList>
                <TabsTab value="recommendation">Rekomendasi</TabsTab>
                <TabsTab value="target">Target</TabsTab>
              </TabsList>
            </Stack>
          </ModalHeader>
          <ModalBody>
            <TabsPanel value="recommendation">
              <SDGsRecommendationTable recommendations={detail?.recom ?? []} />
            </TabsPanel>

            <TabsPanel value="target">
              <SDGsTargetTable targets={detail?.target ?? []} />
            </TabsPanel>
          </ModalBody>
        </Tabs>
      </ModalContent>
    </ModalRoot>
  )
}
