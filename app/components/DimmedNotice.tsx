import { Paper, Group, Text } from "@mantine/core"
import { TablerIconsProps } from "@tabler/icons-react"

import { vars } from "#theme/artifact/vars.mjs"

import { rem } from "#modules/css-utils.ts"

export const DimmedNotice = (props: {
  icon: (props: TablerIconsProps) => JSX.Element
  message: string
}) => {
  const Icon = props.icon
  return (
    <Paper
      w="max-content"
      mx={"auto"}
      p={{ base: 10, sm: 20 }}
      bg={vars("color-gray-1")}
    >
      <Group justify="center">
        <Icon
          style={{ width: rem(32), height: "auto" }}
          color={vars("color-gray-4")}
        />
        <Text fz={{ base: 16, sm: 24 }} c={vars("color-gray-4")}>
          {props.message}
        </Text>
      </Group>
    </Paper>
  )
}
