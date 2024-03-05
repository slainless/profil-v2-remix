import { style } from "@vanilla-extract/css"

import { bp, vars } from "Theme/artifact/vars.mjs"

import { largerThan, rem } from "Modules/css-utils.ts"

export const containerStyle = style({
  borderRadius: vars("radius-md"),
  "@media": {
    [largerThan(bp("sm"))]: {
      borderRadius: 0,
    },
  },
})

export const slideStyle = style({
  backgroundColor: "rgba(29, 29, 29, 0.50)",
  textShadow: "2px 2px #000",
  padding: rem(24),
  alignItems: "start",
  textAlign: "start",
  justifyContent: "center",
  // textShadow: isLtSmall ? "3px 3px #000" : "2px 2px #000",
  "@media": {
    [largerThan(bp("sm"))]: {
      textShadow: "3px 3px #000",
      padding: rem(100),
      alignItems: "center",
      textAlign: "center",
    },
  },
})
