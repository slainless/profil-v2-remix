// export { default as theme } from "./mantine.cjs"
const vars = (str) => `var(--mantine-${str})`
export const theme = {
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },
  colors: {
    primary: [
      "#B3FFEA",
      "#73EDC5",
      "#52C7A1",
      "#4A977E",
      "#298064",
      "#0F7050",
      "#006643",
      "#005936",
      "#004329",
      "#00321F",
    ],
    secondary: [
      "#E3FFC1",
      "#B9E581",
      "#95FD0F",
      "#77FA00",
      "#59BD00",
      "#438E00",
      "#326A00",
      "#265000",
      "#000000",
      "#000000",
    ],
  },
  primaryColor: "primary",
  fontFamily: "Outfit",

  schemedColors: {
    layer: {
      1: [vars("color-gray-0"), vars("color-dark-7")],
      2: [vars("color-gray-1"), vars("color-dark-6")],
      3: [vars("color-gray-0"), vars("color-dark-7")],
    },
    bg: {
      main: [vars("color-white"), vars("color-dark-8")],
      accent: [vars("color-gray-0"), vars("color-dark-7")],
    },
    ["text-dark"]: {
      9: [vars("color-dark-9"), vars("white")],
      8: [vars("color-dark-8"), vars("color-gray-0")],
      7: [vars("color-dark-7"), vars("color-gray-1")],
      6: [vars("color-dark-6"), vars("color-gray-2")],
      5: [vars("color-dark-5"), vars("color-gray-3")],
      4: [vars("color-dark-4"), vars("color-gray-4")],
      3: [vars("color-dark-3"), vars("color-gray-5")],
      2: [vars("color-dark-2"), vars("color-gray-6")],
      1: [vars("color-dark-1"), vars("color-gray-7")],
      0: [vars("color-dark-0"), vars("color-gray-8")],
    },
    ["text-green"]: {
      darkest: [vars("color-green-8"), vars("color-green-6")],
      darker: [vars("color-green-7"), vars("color-green-5")],
    },
    ["text-red"]: {
      darkest: [vars("color-red-8"), vars("color-red-6")],
      darker: [vars("color-red-7"), vars("color-red-5")],
    },
  },
}

export default theme
