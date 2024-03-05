function scaleRem(remValue: number | string) {
  return `calc(${remValue} * var(--mantine-scale))`
}

function createConverter(units: string, { shouldScale = false } = {}) {
  return (value: number | string) => {
    if (value === 0 || value === "0") {
      return "0"
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`
      return shouldScale ? scaleRem(val) : val
    }
    if (typeof value === "string") {
      if (value.includes("calc(") || value.includes("var(")) {
        return value
      }
      if (value.includes(units)) {
        return shouldScale ? scaleRem(value) : value
      }
      const replaced = value.replace("px", "")
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`
        return shouldScale ? scaleRem(val) : val
      }
    }
    return value
  }
}

const rem = createConverter("rem", { shouldScale: true })
const em = createConverter("em")

export const smallerThan = (breakpoint: string) => `(max-width: ${breakpoint})`
export const largerThan = (breakpoint: string) => `(min-width: ${breakpoint})`

export const contentsOrNone = (shouldContent: boolean) =>
  shouldContent ? "contents" : "none"

export { em, rem }
