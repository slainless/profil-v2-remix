/* eslint-disable @typescript-eslint/no-explicit-any */
import ky from "ky"

import { UnderscoredCode } from "Modules/domain-handler"

import { asset } from "./assets.ts"
import { rest } from "./rest.ts"

type IDMResponse = {
  error: boolean
  status: number
  mapData: IDM.Main
}

export namespace IDM {
  export interface Main {
    SUMMARIES: Summary
    ROW: Row[]
    IDENTITAS: Identity[]
  }

  export interface Summary {
    SKOR_SAAT_INI: number
    STATUS: string
    TARGET_STATUS: string
    SKOR_MINIMAL: string
    PENAMBAHAN: number
    TAHUN: number
  }

  export interface Row {
    NO: number
    INDIKATOR: string
    SKOR: number
    KETERANGAN: string
    KEGIATAN: string
    NILAI: string
    PUSAT: any
    PROV: any
    KAB: string
    DESA: any
    CSR: any
    LAINNYA: any
    ROW_CELL: number
  }

  export interface Identity {
    nama_provinsi: string
    id_prov: string
    id_kabupaten: string
    nama_kab_kota: string
    id_kecamatan: string
    nama_kecamatan: string
    id_desa: string
    nama_desa: string
  }
}

export interface IDM {}

export const getAvailableIDM = (schema: UnderscoredCode) =>
  rest("idm_available/" + schema).json<number[]>()

export const getIDM = (schema: UnderscoredCode, year: number) =>
  ky.get(asset.idm({ schema, year: year + ".json" })).json<IDMResponse>()
