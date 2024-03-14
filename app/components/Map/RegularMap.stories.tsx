import { Box, TextInput } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"
import { useAtom } from "jotai"
import debounce from "lodash.debounce"
import { useCallback } from "react"

import { schemaAtom } from "Providers/profile"

import { DomainHandler } from "Modules/domain-handler"

import RegularMap from "./RegularMap"

const meta = {
  title: "Map/Regular Map",
  component: RegularMap,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RegularMap>

export default meta
type Story = StoryObj<typeof RegularMap>

export const Default = {} satisfies Story

export const Preview = {
  decorators: [
    (Story) => {
      const [schema, setSchema] = useAtom(schemaAtom)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const debouncedSetSchema = useCallback(debounce(setSchema), [schema])
      return (
        <Box>
          <TextInput
            value={schema}
            onChange={(e) => {
              const v = e.target.value
              // @ts-expect-error ...
              debouncedSetSchema(DomainHandler.normalizeCode(v))
            }}
            placeholder="Set schema lookup"
            m={12}
            w={240}
            label="Masukkan Schema"
            description="Dalam format: 12_34_56_7890"
          />
          <Story />
        </Box>
      )
    },
    // (Story) => {
    //   return (
    //     <Provider store={store}>
    //       <Story />
    //     </Provider>
    //   )
    // },
  ],
} satisfies Story
