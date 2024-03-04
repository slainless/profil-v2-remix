import { mkdir, writeFile } from "fs/promises"
import { dirname, join } from "path"

import { loadTheme, parseFilename } from "./fs.mjs"
import {
  outputResolvedTheme,
  outputThemeDeclaration,
  outputTokenCss,
  outputVars,
  outputVarsDeclaration,
} from "./output.mjs"
import { mapThemeToVars } from "./vars.mjs"

async function main() {
  const mantineThemePath = process.argv.slice(2)[0]
  const theme = await loadTheme(mantineThemePath)
  const varsMap = mapThemeToVars(theme)

  const themeDir = dirname(mantineThemePath)
  const [filename, ext] = parseFilename(mantineThemePath)

  try {
    await mkdir(join(themeDir, "artifact"))
  } catch (e) {
    if (e.errno !== -4075) throw e
  }

  await Promise.all([
    writeFile(
      join(themeDir, `${filename}.d.${ext.replace("js", "ts")}`),
      outputThemeDeclaration(),
    ),
    writeFile(
      join(themeDir, "artifact", `${filename}.css`),
      outputTokenCss(theme),
    ),
    writeFile(join(themeDir, "artifact", "vars.mjs"), outputVars(theme)),
    writeFile(
      join(themeDir, "artifact", "vars.d.mts"),
      outputVarsDeclaration(theme),
    ),
    writeFile(
      join(themeDir, "artifact", "resolved-theme.mjs"),
      outputResolvedTheme(theme),
    ),
  ])
}

main()
