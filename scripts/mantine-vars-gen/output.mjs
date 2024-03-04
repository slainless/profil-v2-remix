import { DEFAULT_THEME } from "@mantine/core"

import { mapThemeToVars } from "./vars.mjs"

export function outputVarsDeclaration(resolvedTheme) {
  return `
export type VarsMap = {
${mapThemeToVars(resolvedTheme)
  .map((r) => `  ["${r[0]}"]: "${r[1]}"`)
  .join("\n")}
}

export const vars: <T extends keyof VarsMap>(key: T) => VarsMap[T]
export const breakpoints: ${JSON.stringify(resolvedTheme.breakpoints)}
export const bp: <T extends keyof typeof breakpoints>(key: T) => typeof breakpoints[T]
`.trim()
}

export function outputVars(resolvedTheme) {
  return `
export const vars = (str) => \`var(--mantine-\${str})\`
export const breakpoints = ${JSON.stringify(resolvedTheme.breakpoints)}
export const bp = (key) => breakpoints[key]
`.trim()
}

export function outputThemeDeclaration() {
  return `
import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride
  `.trim()
}

export function outputResolvedTheme(resolvedTheme) {
  return `
export const theme = ${JSON.stringify(resolvedTheme)}
export default theme
  `.trim()
}

const nestedCssVars = (s, kprefix, vfn) =>
  Object.entries(s ?? {}).map(([k, v]) => `${kprefix + k}: ${vfn(v)};`)
export function outputTokenCss(resolvedTheme) {
  return `
:root {
  ${Object.entries(resolvedTheme.schemedColors)
    .map(([k, v]) => nestedCssVars(v, `--mantine-color-${k}-`, (t) => t[0]))
    .flat()
    .join("\n  ")}
}

:root[data-mantine-color-scheme="dark"] {
  ${Object.entries(resolvedTheme.schemedColors)
    .map(([k, v]) => nestedCssVars(v, `--mantine-color-${k}-`, (t) => t[1]))
    .flat()
    .join("\n  ")}
}
  `.trim()
}
