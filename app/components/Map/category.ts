import {
  Icon,
  IconBeach,
  IconFish,
  IconFountain,
  IconHomeDollar,
  IconPhotoHeart,
} from "@tabler/icons-react"

export type Category = {
  name: string
  icon: Icon
}

export const categories = {
  bumdes: {
    name: "Bumdes",
    icon: IconHomeDollar,
  },
  wisata: {
    name: "Wisata {{ alias }}",
    icon: IconBeach,
  },
  potensi: {
    name: "Potensi {{ alias }}",
    icon: IconFish,
  },
  umum: {
    name: "Fasilitas Umum",
    icon: IconFountain,
  },
  gallery: {
    name: "Galeri {{ alias }}",
    icon: IconPhotoHeart,
  },
} as const satisfies Record<string, Category>
