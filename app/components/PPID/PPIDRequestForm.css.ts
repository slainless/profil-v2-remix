import { style } from "@vanilla-extract/css"

import { bp, vars } from "Theme/artifact/vars.mjs"

import { largerThan } from "Modules/css-utils.ts"

export const requestFormStyle = style({
  display: "grid",
  gridTemplateColumns: "auto",
  gridAutoRows: "auto",
  width: "100%",
  gap: vars("spacing-lg"),
  "@media": {
    [largerThan(bp("sm"))]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
})

export const fieldSpanFullStyle = style({
  "@media": {
    [largerThan(bp("sm"))]: {
      gridColumnEnd: "span 2",
    },
  },
})
