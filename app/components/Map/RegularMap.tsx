"use client"

import { Group, Select, TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import "maplibre-gl/dist/maplibre-gl.css"
import { render } from "micromustache"
import { useEffect, useMemo, useState } from "react"
import {
  Map,
  Layer,
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl/maplibre"
import { stripHtml } from "string-strip-html"
import { useQuery } from "urql"

import { theme } from "#theme/artifact/resolved-theme.mjs"

import { isLoadedPoiAtom } from "#providers/map.ts"
import { aliasDesaAtom, schemaAtom } from "#providers/profile.ts"

import { PointOfInterest } from "#graphql/graphql.ts"

import { pointOfInterestsQuery } from "#queries/poi.ts"

import { asset, withAtom } from "#services/assets.ts"
import { maptilerKeyAtom } from "#services/env.js"

import { rem } from "#modules/css-utils.ts"
import bbox from "#modules/geojson-bbox.js"
import { boundsOfIndonesia, centerOfIndonesia } from "#modules/geojson-utils.ts"

import { FocusButton } from "./FocusButton.tsx"
import styles from "./InteractiveMap.module.css"
import { PreviewCard } from "./PreviewCard.tsx"
import { Style, StyleSwitcher, mapStyle, tileUrl } from "./StyleSwitcher.tsx"
import { categories } from "./category.ts"
import { useBorderDesa, useBorderPoi } from "./use-border-desa.ts"
import { useFilterList } from "./use-filter-list.ts"

const SearchInput = (props: { onChange: (v: string) => void }) => {
  return (
    <TextInput
      w={{ base: "100%", sm: "auto" }}
      maw={240}
      placeholder="Telusuri Peta"
      rightSectionWidth={42}
      onChange={(e) => props.onChange(e.currentTarget.value)}
      rightSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
    />
  )
}

const CategorySelector = (props: { onChange: (v: string | null) => void }) => {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  return (
    <Select
      w={{ base: "100%", sm: "auto" }}
      maw={240}
      placeholder="Lihat Semua"
      data={[
        { label: "Lihat Semua", value: "" },
        ...Object.entries(categories).map(([k, v]) => ({
          label: render(v.name, { alias: aliasDesa }),
          value: k,
        })),
      ]}
      onChange={(value) => {
        if (value === "") props.onChange(null)
        else props.onChange(value as string)
      }}
    />
  )
}

const RegularMap = () => {
  const [{ data }] = useQuery({ query: pointOfInterestsQuery })
  const { result, search, setCategory } = useFilterList(data?.items ?? [])
  const [popUp, setPopUp] = useState<PointOfInterest | null>(null)
  const [style, setStyle] = useState<Style>(Style.SATELLITE)

  const ms = useMemo(() => mapStyle[style ?? Style.SATELLITE], [style])
  const schema = useAtomValue(schemaAtom)

  const { borderDesa, errorDesa } = useBorderDesa(schema)
  if (errorDesa != null) console.error("BorderMapError:", errorDesa)
  const { borderPoi, centerPoi, countPoi } = useBorderPoi(result)
  const isLoadedPoi = useAtomValue(isLoadedPoiAtom)

  const [map, setMap] = useState<MapRef | null>(null)
  useEffect(() => {
    if (map == null) return

    const b = bbox(borderDesa)
    if (b == null) {
      if (isLoadedPoi) {
        const p = bbox(borderPoi)
        if (p != null) {
          if (countPoi === 1) {
            setStyle(Style.BASIC)
            map.flyTo({
              zoom: 12,
              center: centerPoi,
            })
          } else {
            setStyle(Style.SATELLITE)
            map.fitBounds(p, { padding: 100 })
          }
        }
      } else {
        setStyle(Style.BASIC)
        map.flyTo({
          zoom: 4,
          center: {
            lat: centerOfIndonesia.latitude,
            lng: centerOfIndonesia.longitude,
          },
        })
      }
    } else {
      setStyle(Style.SATELLITE)
      map.fitBounds(b, { padding: 50 })
    }
  }, [borderDesa, borderPoi, centerPoi, countPoi, isLoadedPoi, map])

  const mapTilerKey = useAtomValue(maptilerKeyAtom)
  return (
    <Map
      initialViewState={{ bounds: boundsOfIndonesia }}
      maxBounds={boundsOfIndonesia}
      style={{ width: "100%", height: "100vh", maxHeight: rem(480) }}
      mapStyle={render(tileUrl, { style: ms.style, key: mapTilerKey })}
      cooperativeGestures={true}
      ref={setMap}
      attributionControl={false}
    >
      <Group p={10}>
        <SearchInput onChange={search} />
        <CategorySelector onChange={setCategory} />
      </Group>

      <NavigationControl />
      <Group pos="absolute" align="flex-end" left={0} bottom={0} p={10}>
        <StyleSwitcher value={style} onChange={setStyle} />
        <FocusButton result={result} />
      </Group>

      {result.map((item) => {
        return (
          <Marker
            key={item.ID}
            latitude={item.point.latitude}
            longitude={item.point.longitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              setPopUp(item as PointOfInterest)
            }}
          ></Marker>
        )
      })}

      {popUp && (
        <Popup
          anchor="top"
          latitude={popUp.point.latitude}
          longitude={popUp.point.longitude}
          onClose={() => setPopUp(null)}
          className={styles.popup}
          style={{
            maxWidth: rem(320),
            width: rem(320),
          }}
        >
          <PreviewCard
            cardWidth="100%"
            imageSize={80}
            titleClamp={1}
            descClamp={2}
            title={popUp.title}
            desc={stripHtml(popUp.description).result}
            imageSrc={withAtom(asset.gallery)({ file: popUp.thumbnail?.URL })}
          />
        </Popup>
      )}

      {borderDesa && (
        <Source type="geojson" data={borderDesa}>
          <Layer
            type="fill"
            paint={{
              "fill-opacity": 0.2,
              "fill-color": theme.colors.green[6],
            }}
          />
          <Layer
            type="line"
            paint={{
              "line-opacity": 0.75,
              "line-width": 2,
              "line-color": theme.colors.gray[0],
              // "line-dasharray": [2, 1],
            }}
          />
        </Source>
      )}
    </Map>
  )
}

export default RegularMap
