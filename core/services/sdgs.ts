import { UnderscoredCode } from "#modules/domain-handler.ts"
import ky from "ky"

import { asset } from "./assets.ts"

export namespace Score {
  export interface Main {
    average: number
    total_desa: number
    data: Goal[]
  }

  export interface Goal {
    /** Probably the index of the goal */
    goals: number
    /** Asset location of SDGs */
    image: string
    score: number
    title: string
  }
}

export namespace Goal {
  export interface Main {
    target: Target[]
    recom: Recommendation[]
  }

  export interface Target {
    deskripsi: string
    kdind: string
    nilaiawal: string
    polapelaksanaan: string
    prakiraanbiaya: string
    satuan: string
    sumber: string
    volume: string
    anrekom: { [k: `th${number}`]: number }
    skor: { [k: `th${number}`]: number }
  }

  export interface Recommendation {
    no: string
    score: string
    unit: string
    name: string
    bnba: string
    recommendation: string
  }
}

export const getSDGsGoal = (
  schema: UnderscoredCode,
  index: string,
  signal: AbortSignal,
) =>
  ky
    .get(asset.sdgs({ schema, file: `goals-${index}.json` }), {
      signal,
    })
    .json<Goal.Main>()

export const getSDGsScore = (schema: UnderscoredCode) =>
  ky.get(asset.sdgs({ schema, file: "skor.json" })).json<Score.Main>()
