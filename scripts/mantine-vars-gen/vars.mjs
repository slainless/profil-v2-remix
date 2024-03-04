const single = (k, v, vd) => [k, vd == null ? v : `light: ${v} | dark: ${vd}`]
const nested = (p, s) =>
  Object.entries(s ?? {}).map(([k, v]) =>
    Array.isArray(v) ? single(`${p}-${k}`, v[0], v[1]) : single(`${p}-${k}`, v),
  )
const colorVariants = (p, s) => [
  single(`${p}-filled`, s[6], s[8]),
  single(`${p}-filled-hover`, s[7], s[9]),
  single(`${p}-light`, "rgba(computed)"),
  single(`${p}-light-hover`, "rgba(computed)"),
  single(`${p}-light-color`, s[6], s[8]),
  single(`${p}-outline`, s[6], s[8]),
  single(`${p}-outline-hover`, "rgba(computed)"),
]

export function mapThemeToVars(theme) {
  return [
    single("scale", theme.scale),
    single("cursor-type", theme.cursorType),
    single("webkit-font-smoothing", theme.fontSmoothing),
    // s("color-scheme", theme.colorScheme),
    // s("moz-font-smoothing", theme.mozFontSmoothing),
    single("color-white", theme.white),
    single("color-black", theme.black),
    single("font-family", theme.fontFamily),
    single("font-family-monospace", theme.fontFamilyMonospace),
    single("font-family-headings", theme.headings.fontFamily),
    single("heading-font-weight", theme.headings.fontWeight),
    single("radius-default", theme.defaultRadius),

    ...nested("line-height", theme.lineHeights),
    ...nested("font-size", theme.fontSizes),
    ...nested("breakpoint", theme.breakpoints),
    ...nested("spacing", theme.spacing),
    ...nested("shadow", theme.shadow),
    ...nested("radius", theme.radius),
    ...nested("shadow", theme.shadows),
    ...colorVariants(
      "color-" + theme.primaryColor,
      theme.colors[theme.primaryColor],
    ),

    ...Object.entries(theme.colors)
      .map(([v, color]) => [
        ...nested("color-" + v, color),
        ...colorVariants("color-" + v, color),
      ])
      .flat(),

    ...[1, 2, 3, 4, 5, 6]
      .map((n) => [
        [`h${n}-font-size`, theme.headings.sizes[`h${n}`].fontSize],
        [`h${n}-line-height`, theme.headings.sizes[`h${n}`].lineHeight],
        [
          `h${n}-font-weight`,
          theme.headings.sizes[`h${n}`].fontWeight ?? theme.headings.fontWeight,
        ],
      ])
      .flat(),

    single("color-bright", theme.black, theme.white),
    single("color-text", "#000", theme.colors.dark[0]),
    single("color-body", "#fff", "#1A1B1E"),
    single("color-error", "#fa5252", "#c92a2a"),
    single("color-placeholder", "#adb5bd", "#5c5f66"),
    single("color-anchor", "#228be6", "#4dabf7"),
    single("color-default", "#fff", "#25262b"),
    single("color-default-hover", "#f8f9fa", "#2C2E33"),
    single("color-default-color", "#000", "#fff"),
    single("color-default-border", "#ced4da", "#373A40"),
    single("color-dimmed", theme.colors.gray[6], theme.colors.dark[2]),

    ...Object.entries(theme.schemedColors ?? {})
      .map(([v, topic]) => nested("color-" + v, topic))
      .flat(),
  ]
}
