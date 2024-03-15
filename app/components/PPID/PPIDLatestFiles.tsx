"use client"

import { Box, Title, Text, Stack } from "@mantine/core"
import { IconFileX } from "@tabler/icons-react"
import dayjs from "dayjs"
import "dayjs/locale/id"
import relativeTime from "dayjs/plugin/relativeTime"
import { useImmerAtom } from "jotai-immer"
import { useEffect, useMemo } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"
import { PPIDViewModal } from "#components/PPID/PPIDViewModal.tsx"

import { PPIDItemsAtom } from "#providers/PPID.ts"

import { PPIDFilesQuery } from "#queries/PPID.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

import { PPIDFileCard } from "./PPIDFileCard.tsx"

dayjs.extend(relativeTime)

export const PPIDLatestFiles = () => {
  const [{ data }] = useQuery({ query: PPIDFilesQuery })
  const lastUpdate = useMemo(() => {
    const date = data?.files?.[0]?.updatedAt
    if (date == null) return null

    return dayjs(date).locale("id").fromNow()
  }, [data])

  const files = data?.files

  const [, setPPIDItems] = useImmerAtom(PPIDItemsAtom)

  useEffect(() => {
    if (data == null) return
    if (data.files.length === 0) return

    setPPIDItems((draft) => {
      for (const file of data.files) {
        draft[file.ID] = file
      }
    })
  }, [data, setPPIDItems])

  return (
    <Box>
      <PPIDViewModal />

      <Title
        fz={{ base: 20, sm: 40 }}
        c={vars("color-primary-4")}
        style={{ textTransform: "uppercase" }}
      >
        Informasi Publik Terbaru
      </Title>
      <Text fz={{ base: 14, sm: 20 }} fw={{ sm: 500 }}>
        {lastUpdate == null ? "" : "Update terakhir " + lastUpdate}
      </Text>
      <Box display={contentsOrNone(files != null && files.length > 0)}>
        <Stack mt={{ base: "xs", sm: "xl" }} gap={"md"}>
          {data?.files.map((file) => (
            <PPIDFileCard
              ID={file.ID}
              name={file.name}
              category={file.category.name}
              downloadCount={file.downloadCount}
              date={dayjs(file.updatedAt).toString()}
              url={file.fileURL}
              key={file.name + file.category.name}
            />
          ))}
        </Stack>
      </Box>
      <Box
        visibleFrom="sm"
        display={contentsOrNone(files != null && files.length == 0)}
      >
        <Box mt={10}>
          <DimmedNotice
            icon={IconFileX}
            message="Belum ada informasi PPID yang dipublikasi"
          />
        </Box>
      </Box>
    </Box>
  )
}
