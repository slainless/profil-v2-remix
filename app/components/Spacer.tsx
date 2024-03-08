import { Space, SpaceProps } from "@mantine/core"

import spacerStyle from "./Spacer.module.css"

export const Spacer = (props: SpaceProps) => (
  <Space
    {...props}
    className={`${spacerStyle.horizontalSpacer} ${props.className}`}
  />
)
