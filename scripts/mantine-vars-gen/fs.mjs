import { DEFAULT_THEME } from "@mantine/core"
import merge from "lodash.merge"
import { basename } from "path"
import { pathToFileURL } from "url"

const validExtension = /\.(js|mjs|cjs)$/

export async function loadTheme(mantineMjsPath) {
  const { theme } = await import(pathToFileURL(mantineMjsPath))
  return merge(DEFAULT_THEME, theme)
}

export function parseFilename(path) {
  const bname = basename(path)
  const ext = validExtension.exec(path)
  if (ext.length != 2) {
    throw new Error("Theme file must be a js, cjs or mjs!")
  }
  return [bname.replace("." + ext[1], ""), ext[1]]
}
