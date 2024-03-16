"use client"

import { Group, Paper } from "@mantine/core"
import { useAtomValue } from "jotai"
import "maplibre-gl/dist/maplibre-gl.css"
import { render } from "micromustache"
import { useEffect, useMemo, useState } from "react"
import { Map, Layer, MapRef, Marker, Source } from "react-map-gl/maplibre"
import { useQuery } from "urql"

import theme from "#theme/artifact/resolved-theme.mjs"

import { FocusButton } from "#components/Map/FocusButton.tsx"
import {
  Style,
  StyleSwitcher,
  mapStyle,
  tileUrl,
} from "#components/Map/StyleSwitcher.tsx"

import { isLoadedPoiAtom } from "#providers/map.ts"
import { schemaAtom } from "#providers/profile.ts"

import { PointOfInterest } from "#graphql/graphql.ts"

import { mainPointOfInterestQuery } from "#queries/poi.ts"

import { maptilerKeyAtom } from "#services/env.js"

import bbox from "#modules/geojson-bbox.js"
import {
  boundsOfIndonesia,
  centerOfIndonesia,
  getCenterOfGeometry,
  getMainPOI,
} from "#modules/geojson-utils.ts"

import { useBorderDesa, useBorderPoi } from "../Map/use-border-desa"

const BorderVillage = () => {
  const [{ data }] = useQuery({ query: mainPointOfInterestQuery })
  const mainPOI = getMainPOI(data)
  const pointOfInterests = (mainPOI ? [mainPOI] : []) as PointOfInterest[]
  const [style, setStyle] = useState<Style>(Style.STREETS)

  const ms = useMemo(() => mapStyle[style ?? Style.STREETS], [style])
  const schema = useAtomValue(schemaAtom)

  const { borderDesa } = useBorderDesa(schema)
  const { borderPoi, centerPoi } = useBorderPoi(pointOfInterests)
  const isLoadedPoi = useAtomValue(isLoadedPoiAtom)

  const [map, setMap] = useState<MapRef | null>(null)
  const [center, setCenter] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  useEffect(() => {
    if (map == null) return

    const b = bbox(borderDesa)
    if (b == null) {
      if (isLoadedPoi) {
        const p = bbox(borderPoi)
        if (p != null) {
          map.flyTo({
            zoom: 12,
            center: centerPoi,
          })
        }
      } else {
        map.flyTo({
          zoom: 3,
          center: {
            lat: centerOfIndonesia.latitude,
            lng: centerOfIndonesia.longitude,
          },
        })
      }
    } else {
      map.fitBounds(b, { padding: 50 })
    }

    if (borderDesa == null || borderDesa.features.length === 0) return

    const c = getCenterOfGeometry(borderDesa)
    setCenter({
      latitude: c?.[1] ?? centerOfIndonesia.latitude,
      longitude: c?.[0] ?? centerOfIndonesia.longitude,
    })
  }, [borderDesa, borderPoi, centerPoi, isLoadedPoi, map])

  const maxBounds = useMemo(() => {
    if (center == null) return
    return [
      center.longitude - 0.5,
      center.latitude - 0.5,
      center.longitude + 0.5,
      center.latitude + 0.5,
    ] as [number, number, number, number]
  }, [center])

  const mapTilerKey = useAtomValue(maptilerKeyAtom)
  return (
    <Paper
      radius="md"
      shadow="md"
      w="100%"
      h="100%"
      style={{ overflow: "hidden" }}
    >
      <Map
        initialViewState={{ bounds: boundsOfIndonesia }}
        maxBounds={maxBounds ?? boundsOfIndonesia}
        dragPan={false}
        dragRotate={false}
        touchZoomRotate={false}
        style={{ width: "100%" }}
        mapStyle={render(tileUrl, { style: ms.style, key: mapTilerKey })}
        cooperativeGestures={true}
        ref={setMap}
        attributionControl={false}
      >
        <Group pos="absolute" align="flex-end" left={0} bottom={0} p={10}>
          <StyleSwitcher value={style} onChange={setStyle} />
          <FocusButton result={pointOfInterests} />
        </Group>

        {mainPOI && (
          <Marker
            key={1}
            latitude={mainPOI.point.latitude}
            longitude={mainPOI.point.longitude}
          ></Marker>
        )}

        {borderDesa && (
          <Source type="geojson" data={borderDesa}>
            <Layer
              type="fill"
              paint={{
                "fill-opacity": 0.3,
                "fill-outline-color": "black",
                "fill-color": theme.colors.green[6],
              }}
            />
          </Source>
        )}
      </Map>
    </Paper>
  )
}

export default BorderVillage
