/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconCash,
  IconUsers,
  IconChartBar,
  IconNumbers,
  IconPackage,
  IconCrown,
} from "@tabler/icons-react"

// import { APBDView } from "Components/Infography/APBDes/APBDView.tsx"
// import { BansosView } from "Components/Infography/Bansos/BansosView.tsx"
// import { IDMView } from "Components/Infography/IDM/IDMView.tsx"
// import { PendudukView } from "Components/Infography/Penduduk/PendudukView.tsx"
// import { SDGsView } from "Components/Infography/SDGs/SDGsView.tsx"
// import { StuntingView } from "Components/Infography/Stunting/StuntingView.tsx"

export type TabType = {
  title?: string
  ogTitle?: string
  bannerTitle?: string
  bannerAlt?: string

  desc?: string

  // view: (...args: any) => JSX.Element
  icon: (...args: any) => JSX.Element
  tabTitle: string

  onlyDesa: boolean
  onlyKel: boolean
}

export const tabMapping = {
  penduduk: {
    title: "Statistik Penduduk",
    ogTitle: "Statistik Penduduk {{ desa_fullname }}",
    tabTitle: "Penduduk",
    // view: PendudukView,
    icon: IconUsers,
    onlyDesa: false,
    onlyKel: false,
  },
  apbdes: {
    title: "APBDes",
    ogTitle: "APB {{ desa_fullname }}",
    tabTitle: "APBDes",
    // view: APBDView,
    icon: IconCash,
    onlyDesa: true,
    onlyKel: false,
  },
  anggaran: {
    title: "Anggaran Kelurahan",
    ogTitle: "Anggaran {{ desa_fullname }}",
    tabTitle: "Anggaran",
    // view: APBDView,
    icon: IconCash,
    onlyDesa: false,
    onlyKel: true,
  },
  stunting: {
    title: "Stunting",
    ogTitle: "Data Stunting {{ desa_fullname }}",
    tabTitle: "Stunting",
    // view: StuntingView,
    icon: IconChartBar,
    onlyDesa: false,
    onlyKel: false,
  },
  bansos: {
    title: "Bantuan Sosial",
    ogTitle: "Data Bansos {{ desa_fullname }}",
    tabTitle: "Bansos",
    // view: BansosView,
    icon: IconPackage,
    onlyDesa: false,
    onlyKel: false,
  },
  idm: {
    title: "IDM",
    ogTitle: "Data IDM {{ desa_fullname }}",
    tabTitle: "IDM",
    // view: IDMView,
    icon: IconCrown,
    onlyDesa: true,
    onlyKel: false,
  },
  sdgs: {
    title: "SDGs",
    ogTitle: "Data SDGs {{ desa_fullname }}",
    tabTitle: "SDGs",
    // view: SDGsView,
    icon: IconNumbers,
    onlyDesa: true,
    onlyKel: false,
  },
} as const satisfies Record<string, TabType>
