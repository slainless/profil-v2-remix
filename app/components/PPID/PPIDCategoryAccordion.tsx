"use client"

import { Accordion, Box, Group, Paper, Text } from "@mantine/core"
import { IconFolderX } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { PPIDViewModal } from "#components/PPID/PPIDViewModal.tsx"

import { PPIDCategoriesMapAtom } from "#providers/PPID.ts"

import type { PpidType } from "#graphql/graphql.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

import { PPIDCategoryAccordionItem } from "./PPIDCategoryAccordionItem.tsx"

export const PPIDCategoryAccordion = ({ type }: { type: PpidType }) => {
  const allCategories = useAtomValue(PPIDCategoriesMapAtom)
  const categories = useMemo(
    () => allCategories[type] ?? [],
    [allCategories, type],
  )

  const [value, setValue] = useState<string[]>([])

  return (
    <>
      <PPIDViewModal />
      <Accordion
        multiple
        value={value}
        onChange={setValue}
        variant="separated"
        radius="md"
        mt={{ base: -30, sm: 0 }}
      >
        <Box display={contentsOrNone(categories.length > 0)}>
          {categories?.map((category) => (
            <PPIDCategoryAccordionItem
              key={category.ID}
              title={category.name}
              id={category.ID}
              opened={value.includes(category.ID + "")}
            />
          ))}
        </Box>
        <Box display={contentsOrNone(categories.length === 0)}>
          <Paper
            w="max-content"
            p={20}
            mx="auto"
            bg={vars("color-gray-2")}
            c={vars("color-gray-6")}
          >
            <Group>
              <IconFolderX />
              <Text fz={{ base: 16, sm: 20 }}>
                Belum ada informasi untuk saat ini.
              </Text>
            </Group>
          </Paper>
        </Box>
      </Accordion>
    </>
  )
}
