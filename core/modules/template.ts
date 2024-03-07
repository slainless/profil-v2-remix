/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { Opaque } from 'type-fest'
import { render as r } from "micromustache"

export function resolver<T extends string, K extends string>(
  template: T,
  requiredKeys: readonly K[],
  processor?: { [_ in K]?: (v: string) => string },
) {
  return (values: { [_ in K]?: string }): T | "" => {
    for (const key of requiredKeys)
      if (values[key] == null || values[key] === "") return ""
    return r(
      template,
      Object.fromEntries(
        // @ts-expect-error ...
        Object.entries(values).map(([k, v]) => [k, processor?.[k]?.(v) ?? v]),
      ),
    ) as T
  }
}

export type Tag<Template extends string, RequiredKeys extends string> = {
  [k in RequiredKeys]: any
} & { template: Template }
export type TagTemplate<T extends Tag<any, any>> = T["template"]
export type TagKeys<T extends Tag<any, any>> =
  T extends Tag<any, infer R> ? { [K in R]: string | null | number } : never

export function tag<Template extends string, RequiredKeys extends string>(
  template: Template,
  keys: readonly RequiredKeys[],
) {
  return template as any as Tag<Template, RequiredKeys>
}

export function render<T extends Tag<any, any>>(
  template: T,
  props: TagKeys<T>,
): TagTemplate<T> {
  return r(template as any as string, props) as TagTemplate<T>
}
