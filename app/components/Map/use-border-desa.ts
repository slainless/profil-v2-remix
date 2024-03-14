"use client"

import type { ValueError } from "@sinclair/typebox/errors"
import { useAtom } from "jotai"
import ky from "ky"
import { LngLat } from "maplibre-gl"
import { useEffect, useState } from "react"

import { isLoadedPoiAtom } from "Providers/map.ts"

import { PointOfInterest } from "GraphQL/graphql.ts"

import { asset } from "Services/assets"

import { UnderscoredCode } from "Modules/domain-handler"
import { BorderDesa } from "Modules/geojson-utils"

export function useBorderDesa(schema: UnderscoredCode) {
  const [result, setResult] = useState<{
    borderDesa?: BorderDesa
    errorDesa?: ValueError[] | Error | boolean
  }>({})

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const result = await ky.get(asset.geojson({ schema })).json()
        if (BorderDesa.Check(result)) {
          return setResult({ borderDesa: result })
        }
        setResult({ errorDesa: Array.from(BorderDesa.Errors(result)) })
      } catch (e) {
        setResult({ errorDesa: e as Error })
      }
    })()
  }, [schema])

  return result
}

export function useBorderPoi(items: Pick<PointOfInterest, "point">[]) {
  const [isLoadedPoi, setLoadedPoi] = useAtom(isLoadedPoiAtom)
  const [result, setResult] = useState<{
    borderPoi?: BorderDesa
    centerPoi?: LngLat
    countPoi?: number
  }>({})

  useEffect(() => {
    if (!isLoadedPoi && items.length) {
      const points = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[] as Record<number, number>[]],
            },
          },
        ],
      }

      items.map((v) => {
        points.features[0].geometry.coordinates[0].push([
          v.point.longitude,
          v.point.latitude,
        ])
      })

      setLoadedPoi(true)

      setResult({
        borderPoi: points as unknown as BorderDesa,
        centerPoi: {
          lng: items[0].point.longitude,
          lat: items[0].point.latitude,
        } as LngLat,
        countPoi: items.length,
      })
    }
  }, [isLoadedPoi, items, result, setLoadedPoi])

  return result
}
