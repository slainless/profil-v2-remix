import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev"
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import { remixDevTools } from "remix-development-tools"
import { defineConfig } from "vite"
import { cjsInterop } from "vite-plugin-cjs-interop"
import tsconfigPaths from "vite-tsconfig-paths"

import { cloudflareContextLoader } from "./server/loader.cloudflare.ts"

const isDev = process.env.NODE_ENV == "development"
const isCloudflare = process.env.USE_CLOUDFLARE != null

export default defineConfig({
  plugins: [
    ...(isCloudflare
      ? [remixCloudflareDevProxy({ getLoadContext: cloudflareContextLoader })]
      : []),
    ...(isDev ? [remixDevTools()] : []),
    remix(),
    tsconfigPaths(),
    vanillaExtractPlugin(),
    cjsInterop({
      dependencies: ["echarts-for-react"],
    }),
  ],
  server: {
    fs: {
      // Restrict files that could be served by Vite's dev server.  Accessing
      // files outside this directory list that aren't imported from an allowed
      // file will result in a 403.  Both directories and files can be provided.
      // If you're comfortable with Vite's dev server making any file within the
      // project root available, you can remove this option.  See more:
      // https://vitejs.dev/config/server-options.html#server-fs-allow
      allow: ["app", "core", "node_modules"],
    },
    warmup: {
      clientFiles: ["@mantine/core/**/*.cjs"],
    },
  },
  ssr: {
    noExternal: ["@amcharts/amcharts4"],
    optimizeDeps: {
      include: [],
    },
  },
})
