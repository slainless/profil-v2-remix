"use client"

import { useAtomValue } from "jotai"
import "maplibre-gl/dist/maplibre-gl.css"

import { desaAtom } from "Providers/profile.ts"

const IframeMap = ({ url }: { url: string }) => {
  const desa = useAtomValue(desaAtom)

  return (
    <iframe
      title={`Geospasial ${desa}`}
      src={url}
      height="580px"
      width="100%"
    />
  )
}

export default IframeMap
