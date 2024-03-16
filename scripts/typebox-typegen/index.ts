import { TypeCompiler } from "@sinclair/typebox/compiler"
import camelcase from "lodash.camelcase"
import capitalize from "lodash.capitalize"
import { createWriteStream } from "node:fs"
import { readdir } from "node:fs/promises"
import { join, extname, relative, basename } from "node:path"
import type { Writable } from "node:stream"

import { IsSchema } from "../../node_modules/@sinclair/typebox/build/import/type/guard/type.mjs"

if (process.argv[2] == null) throw new Error("No directory to target!")

const results: string[] = []
const errors: [string, Error][] = []

const tasks: Promise<void>[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asyncWriter = (stream: Writable) => (chunk: any) =>
  new Promise((res, rej) =>
    stream.write(chunk, (err) => (err == null ? res(err) : rej(err))),
  )
const transform = async (p: string) => {
  // const path = relative(
  //   dirname(fileURLToPath(import.meta.url)),
  //   join(process.cwd(), p),
  // )
  const path = relative(process.cwd(), p)
  const ext = extname(path)
  const file = createWriteStream(
    path.replace(new RegExp(`${ext}$`), `.compiled${ext}`),
    {},
  )
  const writer = asyncWriter(file)

  try {
    const tasks: Promise<void>[] = []
    console.log("• Transforming:", path)
    const module = await import(path)
    if (ext === ".ts")
      await writer(
        `/* eslint-disable @typescript-eslint/ban-ts-comment */\n` +
          `// @ts-nocheck\n` +
          `import type { ${Object.keys(module)
            .filter((k) => k !== "default")
            .join(", ")} } from "./${basename(path)}"\n\n`,
      )
    for (const exportedKey in module) {
      const exported = module[exportedKey]
      console.log("> Discovered exported:", exportedKey, "| from:", path)
      if (IsSchema(exported) == false) {
        console.log("> Skipped exported:", exportedKey, "| from:", path)
        continue
      }
      console.log("> Transforming exported:", exportedKey, "| from:", path)
      tasks.push(
        new Promise((res, rej): void => {
          const code = TypeCompiler.Code(exported).replace(
            "return function check(value)",
            ext === ".ts"
              ? `export function is${capitalize(camelcase(exportedKey))}(value: unknown): value is ${exportedKey}`
              : `export function is${capitalize(camelcase(exportedKey))}(value)`,
          )
          file.write(code + "\n\n", (e) => {
            if (e instanceof Error) return rej(e)
            return res()
          })
        }),
      )
    }
    await Promise.all(tasks)
    results.push(path)
    console.log("✓ Done transforming:", path)
  } catch (e) {
    errors.push([path, e as Error])
    console.log("× Error transforming:", path)
    console.log(">", e)
  } finally {
    file.close()
  }
}

console.log("Typebox Typegen")
console.log("+++++++++++++++\n")

console.log("Reading files...")
const files = await readdir(process.argv[2], {
  withFileTypes: true,
  recursive: true,
})

for (const file of files) {
  const path = join(file.path, file.name)
  console.log("• Discovered file:", path)
  if (file.isDirectory()) {
    console.log("• Skipped directory:", path)
    continue
  }
  if ([".ts", ".js"].includes(extname(path)) == false) {
    console.log("• Skipped non-code file:", path)
    continue
  }
  if (path.split(".").slice(-2, -1)[0] === "compiled") {
    console.log("• Skipped compiled file:", path)
    continue
  }
  tasks.push(transform(path))
}

await Promise.all(tasks)

console.log("\n+++++++++++++++")
console.log("Done!\n")
if (results.length > 0) {
  console.log("Successfully compiled:")
  for (const result of results) console.log("✓", result)
}

if (errors.length > 0) {
  console.log("\nFailed to compile:")
  for (const error of errors) {
    console.log("×", error[0])
    console.log(">", error[1])
  }
}
