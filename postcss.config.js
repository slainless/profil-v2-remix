import { theme } from "./app/theme/mantine.js"

const prefixKeys =
  (prefix) =>
  ([k, v]) => [`${prefix}-${k}`, v]

export default {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: Object.fromEntries([
        ...Object.entries(theme.breakpoints).map(prefixKeys("bp")),
      ]),
    },
  },
}
