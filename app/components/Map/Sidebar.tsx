"use client"

import {
  Box,
  BoxProps,
  Button,
  Image,
  ScrollArea,
  ScrollAreaProps,
  Stack,
  Text,
} from "@mantine/core"
import { IconChevronLeft } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { PropsWithChildren, useState } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { desaAtom } from "Providers/profile.ts"

import AssetsMapIllustration from "Assets/map-smartphone-illustration.svg"

import { DetailCard } from "./DetailCard.tsx"
import { PreviewCard } from "./PreviewCard.tsx"
import sidebarStyle from "./Sidebar.module.css"
import { categories } from "./category.ts"

export interface Entry {
  title?: string
  desc?: string

  imageSrc?: string
  imageAlt?: string

  category?: (typeof categories)[keyof typeof categories]
}

export interface SidebarProps {
  entries?: Entry[]
  onEntryClick?: (e: Entry) => void
}

namespace Layout {
  export const Root = (props?: PropsWithChildren<BoxProps>) => (
    <Box className={sidebarStyle.root} {...props} />
  )

  export const ListArea = ({ children, ...props }: ScrollAreaProps) => (
    <ScrollArea className={sidebarStyle.contentContainer} {...props}>
      <Stack gap={"xs"} p="var(--padding)">
        {children}
      </Stack>
    </ScrollArea>
  )

  export const DetailArea = (props: ScrollAreaProps) => (
    <ScrollArea className={sidebarStyle.detailContainer} {...props} />
  )

  export const EmptyPlaceholder = (props?: BoxProps & { hidden?: boolean }) => {
    const desa = useAtomValue(desaAtom)
    return (
      <Box {...props}>
        <Box className={sidebarStyle.illustration}>
          <Image src={AssetsMapIllustration} alt="empty illustration" />
          <Text fz={13} c={vars("color-dimmed")} px="10%" ta="center">
            Jelajahi titik-titik penting di {desa}
          </Text>
        </Box>
      </Box>
    )
  }
}

export function Sidebar(props: SidebarProps) {
  const isHavingEntry = props.entries != null && props.entries.length > 0
  const [activeDetail, setActiveDetail] = useState<MemberOf<
    SidebarProps["entries"]
  > | null>()

  return (
    <Layout.Root>
      <Layout.ListArea hidden={isHavingEntry == false || activeDetail != null}>
        {props.entries?.map((entry, i) => (
          <PreviewCard
            // @ts-expect-error ...
            component="button"
            onClick={() => {
              props.onEntryClick?.(entry)
              setActiveDetail(entry)
            }}
            classNames={{
              root: sidebarStyle.entry,
              image: sidebarStyle.entryImage,
            }}
            imageSize={52}
            cardWidth="100%"
            {...entry}
            key={i}
          />
        ))}
      </Layout.ListArea>
      <Layout.EmptyPlaceholder hidden={isHavingEntry || activeDetail != null} />
      <Layout.DetailArea hidden={activeDetail == null}>
        <Box p="calc(var(--padding) / 2)">
          <Button
            size="compact-md"
            leftSection={<IconChevronLeft size={16} />}
            variant="subtle"
            onClick={() => setActiveDetail(null)}
          >
            Kembali
          </Button>
        </Box>
        <DetailCard {...activeDetail} />
      </Layout.DetailArea>
    </Layout.Root>
  )
}
