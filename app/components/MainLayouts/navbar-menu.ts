export type NavbarRoute = {
  title: string
  href?: string
  hrefs?: { title: string; href?: string }[]
  onlyDesa: boolean
  onlyKel: boolean
}
export const navbarMenu = [
  { title: "Home", href: "/", onlyDesa: false, onlyKel: false },
  {
    title: "Profil {{ alias }}",
    href: "/profil",
    onlyDesa: false,
    onlyKel: false,
  },
  {
    title: "Infografis",
    href: "/infografis",
    onlyDesa: false,
    onlyKel: false,
  },
  {
    title: "Listing",
    href: "/listing",
    onlyDesa: false,
    onlyKel: false,
  },
  {
    title: "IDM",
    href: "/infografis/idm",
    onlyDesa: true,
    onlyKel: false,
  },
  {
    title: "Berita",
    href: "/berita",
    onlyDesa: false,
    onlyKel: false,
  },
  {
    title: "Belanja",
    href: "/belanja",
    onlyDesa: false,
    onlyKel: false,
  },
  { title: "PPID", href: "/ppid", onlyDesa: false, onlyKel: false },
  // {
  //   title: "Lainnya",
  //   hrefs: [
  //     { title: "Bumdes", href: "/bumdes" },
  //     { title: "Galeri Desa", href: "/galeri" },
  //     { title: "Potensi Desa", href: "/potensi" },
  //     { title: "Wisata Desa", href: "/wisata" },
  //   ],
  // },
] as const satisfies NavbarRoute[]
