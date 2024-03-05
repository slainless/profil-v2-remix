import { render } from "micromustache"

export function resolver<T extends string, K extends string>(
  template: T,
  requiredKeys: readonly K[],
  processor?: { [_ in K]?: (v: string) => string },
) {
  return (values: { [_ in K]?: string }): T | "" => {
    for (const key of requiredKeys)
      if (values[key] == null || values[key] === "") return ""
    return render(
      template,
      Object.fromEntries(
        // @ts-expect-error ...
        Object.entries(values).map(([k, v]) => [k, processor?.[k]?.(v) ?? v]),
      ),
    ) as T
  }
}
