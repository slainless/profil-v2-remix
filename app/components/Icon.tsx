import { Box, BoxProps } from "@mantine/core"
import { Icon as IconType, TablerIconsProps } from "@tabler/icons-react"
import { forwardRef } from "react"

export interface IconProps
  extends BoxProps,
    Omit<TablerIconsProps, "style" | "opacity" | "display"> {
  icon: IconType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Icon = forwardRef(({ icon, ...props }: IconProps, ref: any) => (
  <Box component={icon} ref={ref} {...props} />
))
Icon.displayName = "Icon"
