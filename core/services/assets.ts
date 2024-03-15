import { resolver } from "#modules/template.ts"
import { schemaAtom } from "#providers/profile.ts"
import { globalStore } from "#providers/store.ts"

const slasher = (schema: string) => schema.replaceAll("_", "/")
const dotter = (schema: string) => schema.replaceAll("_", ".")

// prettier-ignore
const withDefault =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <T extends (v: any) => string>(fn: T, def: Record<string, string>): T =>
    // @ts-expect-error ...
    (v) => fn({ ...v, ...def, })

export namespace Template {
  export const gallery = "{{ asset }}/profil/{{ schema }}/berita/{{ file }}"
  export const ppid = "{{ asset }}/profil/{{ schema }}/ppid/{{ file }}"
  export const staff = "{{ asset }}/profil/{{ schema }}/staff/{{ file }}"
  export const common = "{{ asset }}/profil/{{ schema }}/common/{{ file }}"
  export const geojson = "{{ asset }}/geojson/{{ schema }}"
  export const idm = "{{ asset }}/idm/{{ schema }}/{{ year }}"
  export const logo300 = "{{ asset }}/online/{{ schema }}/common/300_{{ file }}"
  export const logo16 = "{{ asset }}/online/{{ schema }}/common/16_{{ file }}"
  export const sdgs = "{{ asset }}/sdgs/{{ schema }}/{{ file }}"
  export const marketItem = "{{ asset }}/marketplace/products/{{ file }}"
  export const mobileUser = "{{ asset }}/marketplace/users/{{ file }}"
  export const ppidDDL = "{{ api }}/ppid_download/{{ schema }}{{ ID }}"
}

const asset = import.meta.env.VITE_ASSET_BASE_URL!
const api = import.meta.env.VITE_GRAPHQL_ENDPOINT!

// prettier-ignore
export namespace Resolver {
  export const gallery = resolver(Template.gallery, ["schema", "file"] as const, { schema: dotter })
  export const ppid = resolver(Template.ppid, ["schema", "file"] as const, { schema: dotter })
  export const staff = resolver(Template.staff, ["schema", "file"] as const, { schema: dotter })
  export const common = resolver(Template.common, ["schema", "file"] as const, { schema: dotter })
  export const logo300 = resolver(Template.logo300, ["schema", "file"] as const, { schema: dotter })
  export const logo16 = resolver(Template.logo16, ["schema", "file"] as const, { schema: dotter })
  export const geojson = resolver(Template.geojson, ["schema"] as const, { schema: (schema) => slasher(schema) + ".json" })
  export const idm = resolver(Template.idm, ["schema", "year"] as const, { schema: slasher })
  export const sdgs = resolver(Template.sdgs, ["schema", "file"] as const, { schema: slasher })
  export const marketItem = resolver(Template.marketItem, ["file"] as const)
  export const mobileUser = resolver(Template.mobileUser, ["file"] as const)

  export const ppidDDL = resolver(Template.ppidDDL, ["schema", "ID"] as const, { schema: (schema) => schema.replaceAll("_", "")})
}

namespace Asset {
  export const gallery = withDefault(Resolver.gallery, { asset })
  export const ppid = withDefault(Resolver.ppid, { asset })
  export const staff = withDefault(Resolver.staff, { asset })
  export const common = withDefault(Resolver.common, { asset })
  export const geojson = withDefault(Resolver.geojson, { asset })
  export const idm = withDefault(Resolver.idm, { asset })
  export const logo300 = withDefault(Resolver.logo300, { asset })
  export const logo16 = withDefault(Resolver.logo16, { asset })
  export const sdgs = withDefault(Resolver.sdgs, { asset })
  export const marketItem = withDefault(Resolver.marketItem, { asset })
  export const mobileUser = withDefault(Resolver.mobileUser, { asset })
  export const ppidDDL = withDefault(Resolver.ppidDDL, { api })
}

export { Asset as asset }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAtom<T extends (v: any) => string | undefined>(fn: T) {
  return (v: Partial<Omit<Parameters<T>[0], "schema">>): ReturnType<T> =>
    // @ts-expect-error ...
    fn({ ...v, schema: globalStore.get(schemaAtom) })
}
