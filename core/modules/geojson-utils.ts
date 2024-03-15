import { Type, Static } from "@sinclair/typebox"
import { TypeCompiler } from "@sinclair/typebox/compiler"
// @ts-expect-error ...
import centroid from "@turf/centroid"
import type { Feature, Point } from "geojson"

import type {
  MainPointOfInterestQuery, // MainPointOfInterestQuery,
  PointOfInterest,
  Point as PointType,
} from "#graphql/graphql.ts"

export const boundsOfIndonesia: [number, number, number, number] = [
  // 94.791205, -10.945325, 141.138935, 6.033016, // @audit original points
  82, -17, 155, 12,
]

export const centerOfIndonesia: PointType = {
  latitude: -2.548926,
  longitude: 118.0148634,
}

export const positionSchema = Type.Union([
  Type.Tuple([Type.Number(), Type.Number(), Type.Number(), Type.Any()]),
  Type.Tuple([Type.Number(), Type.Number()]),
])
export type Position = Static<typeof positionSchema>

export const borderDesaSchema = Type.Object({
  type: Type.Literal("FeatureCollection"),
  features: Type.Array(
    Type.Object({
      type: Type.Literal("Feature"),
      geometry: Type.Union([
        Type.Object({
          type: Type.Literal("Polygon"),
          coordinates: Type.Array(Type.Array(positionSchema)),
        }),
        Type.Object({
          type: Type.Literal("MultiPolygon"),
          coordinates: Type.Array(Type.Array(Type.Array(positionSchema))),
        }),
      ]),
    }),
  ),
})
export const BorderDesa = TypeCompiler.Compile(borderDesaSchema)
export type BorderDesa = Static<typeof borderDesaSchema>

export function getCenterOfGeometry(
  geojson?: BorderDesa,
): [number, number] | [number, number, number] | undefined {
  if (geojson == null || geojson.features.length === 0 || geojson.type == null)
    return
  const center = centroid(geojson) as Feature<Point>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return center.geometry.coordinates as any
}
export function getMainPOI(
  data: MainPointOfInterestQuery | undefined,
): Pick<PointOfInterest, "point"> | undefined {
  if (data?.item == null) return
  if (
    data.item.point.latitude == centerOfIndonesia.latitude &&
    data.item.point.longitude == centerOfIndonesia.longitude
  )
    return
  return data.item
}
