"use client"

import { Image } from "@mantine/core"
import { useAtomValue } from "jotai"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import LightGallery from "lightgallery/react"

import { desaProfileAtom } from "Providers/desa-profile.ts"
import { aliasDesaAtom } from "Providers/profile.ts"

import member from "Assets/member.png"

import { asset, withAtom } from "Services/assets.ts"

function PerangkatDesa() {
  const desaProfile = useAtomValue(desaProfileAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const onInit = () => {
    // console.log("lightGallery has been initialized")
  }

  return (
    <LightGallery onInit={onInit} speed={100} plugins={[lgThumbnail, lgZoom]}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className="gallery-item"
        data-src={
          withAtom(asset.common)({ file: desaProfile?.SPDChart }) ?? member
        }
      >
        <Image
          alt={`Bagan SOTK ${aliasDesa}`}
          radius="md"
          src={withAtom(asset.common)({ file: desaProfile?.SPDChart })}
          fallbackSrc={member}
        />
      </a>
    </LightGallery>
  )
}

export default PerangkatDesa
