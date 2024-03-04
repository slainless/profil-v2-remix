import { render } from "micromustache"

export function resolver<T extends string, K extends string>(
  template: T,
  requiredKeys: readonly K[],
  processor?: { [_ in K]?: (v: string) => string },
) {
  return (values: { [_ in K]: string }): T =>
    render(
      template,
      Object.fromEntries(
        // @ts-expect-error ...
        Object.entries(values).map(([k, v]) => [k, processor?.[k]?.(v) ?? v]),
      ),
    ) as T
}
