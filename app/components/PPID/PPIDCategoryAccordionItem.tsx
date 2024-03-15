"use client"

import {
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Text,
  Box,
  Group,
  LoadingOverlay,
} from "@mantine/core"
import { IconFileX } from "@tabler/icons-react"
import { useImmerAtom } from "jotai-immer"
import { useEffect, useState } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { PPIDItemsAtom } from "#providers/PPID.ts"

import type { PpidFilesQuery } from "#graphql/graphql.ts"

import { PPIDFilesQuery } from "#queries/PPID.ts"

import { PPIDFileStacks } from "./PPIDFileStacks.tsx"
import { PPIDFileTable } from "./PPIDFileTable.tsx"

export const PPIDCategoryAccordionItem = ({
  opened,
  title,
  id,
}: {
  opened: boolean
  title: string
  id: number
}) => {
  const [files, setFiles] = useState<PpidFilesQuery["files"]>([])
  const [{ data, fetching: loading }] = useQuery({
    query: PPIDFilesQuery,
    variables: {
      categoryID: id,
    },
    pause: !opened,
  })

  const [, setPPIDItems] = useImmerAtom(PPIDItemsAtom)

  useEffect(() => {
    typeof window != "undefined" && (window.location.hash = "")
    if (data == null) return
    if (data.files.length === 0) return

    setPPIDItems((draft) => {
      for (const file of data.files) {
        draft[file.ID] = file
      }
    })

    setFiles(data.files)
  }, [data, setPPIDItems])

  return (
    <AccordionItem value={id + ""} bg={"#fff"}>
      <AccordionControl>
        <Text fz={{ sm: 20 }} fw={{ sm: "bold" }}>
          {title}
        </Text>
      </AccordionControl>
      <AccordionPanel pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ blur: 2 }}
        />
        <Box display={files.length > 0 ? "block" : "none"}>
          <Box hiddenFrom="sm">
            <PPIDFileStacks files={files} />
          </Box>
          <Box visibleFrom="sm">
            <PPIDFileTable files={files} />
          </Box>
        </Box>
        <Box display={files.length > 0 ? "none" : "block"}>
          <Group py={20} justify="center" gap={"xs"}>
            <IconFileX color={vars("color-gray-5")} />
            <Text fz={{ base: 16, sm: 20 }} c={vars("color-gray-5")}>
              Tidak ada file untuk sekarang
            </Text>
          </Group>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )
}
