const { breakpoints } = require("./app/theme/mantine.cjs")

const prefixKeys =
  (prefix) =>
  ([k, v]) => [`${prefix}-${k}`, v]

module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: Object.fromEntries([
        ...Object.entries(breakpoints).map(prefixKeys("bp")),
      ]),
    },
  },
}
