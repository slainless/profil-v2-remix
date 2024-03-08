"use client"

import { Image } from "@mantine/core"
import { useAtomValue } from "jotai"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import LightGallery from "lightgallery/react"

import { desaProfileAtom } from "Providers/desa-profile.ts"
import { profileAtom } from "Providers/profile.ts"

import member from "Assets/member.png"

import { asset, withAtom } from "Services/assets.ts"

function PerangkatBPD() {
  const profile = useAtomValue(profileAtom)
  const desaProfile = useAtomValue(desaProfileAtom)
  const onInit = () => {
    // console.log("lightGallery has been initialized")
  }

  return (
    <LightGallery onInit={onInit} speed={100} plugins={[lgThumbnail, lgZoom]}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className="gallery-item"
        data-src={
          withAtom(asset.common)({ file: desaProfile?.BPDChart }) ?? member
        }
      >
        <Image
          alt={`Bagan Struktur ${profile.alias.BPD.match(/\b(\w)/g)?.join("")}`}
          radius="md"
          src={withAtom(asset.common)({ file: desaProfile?.BPDChart })}
          fallbackSrc={member}
        />
      </a>
    </LightGallery>
  )
}

export default PerangkatBPD
