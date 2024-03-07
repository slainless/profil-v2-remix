import { style } from "@vanilla-extract/css"

import { bp, vars } from "Theme/artifact/vars.mjs"

import { largerThan } from "Modules/css-utils.ts"

export const cardLayoutStyle = style({
  display: "grid",
  gridTemplateColumns: "min-content auto min-content",
  gridTemplateRows: "auto",
  gridTemplateAreas: `"image title value"`,
  gap: vars("spacing-lg"),
  height: "100%",
  "@media": {
    [largerThan(bp("xs"))]: {
      gridTemplateColumns: "min-content auto",
      gridTemplateAreas: `"title title" "image value"`,
      gridTemplateRows: "auto min-content",
    },
  },
})
