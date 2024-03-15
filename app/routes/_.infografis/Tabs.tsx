"use client"

import { rem } from "#modules/css-utils.ts"
import { currentTabAtom } from "#providers/infography.ts"
import { TabsTab, Tabs as _Tabs } from "@mantine/core"
import { Link } from "@remix-run/react"
import type { TablerIconsProps } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { type FunctionComponent, type ReactNode } from "react"

export const Icon = ({ as }: { as: FunctionComponent<TablerIconsProps> }) => {
  const Component = as
  return <Component style={{ width: rem(50), height: rem(50) }} />
}

export const Tabs = ({ children }: { children: ReactNode }) => {
  const currentTab = useAtomValue(currentTabAtom)
  // const navigate = useNavigate()
  // const onChange = useCallback(
  //   (newTab: string | null) => navigate(`./${newTab}`),
  //   [navigate],
  // )

  return (
    <_Tabs
      value={currentTab}
      // onChange={onChange}
    >
      {children}
    </_Tabs>
  )
}

export const Tab = ({
  value,
  icon,
  children,
}: {
  value: string
  icon: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    // @ts-expect-error ...
    <TabsTab value={value} component={Link} to={`../infografis/${value}`}>
      <div
        style={{ display: "block", textAlign: "center", fontWeight: "bold" }}
      >
        <div>{icon}</div>
        {children}
      </div>
    </TabsTab>
  )
}

export const Panel = _Tabs.Panel
