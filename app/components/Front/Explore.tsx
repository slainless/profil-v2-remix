"use client"

import { Group, Stack, Title, Text, Box, Image, Grid } from "@mantine/core"
import { Link } from "@remix-run/react"
import { useAtomValue } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { aliasDesaAtom } from "Providers/profile.ts"

import explore1 from "Assets/explore1.png"
import explore2 from "Assets/explore2.png"
import explore3 from "Assets/explore3.png"
import explore4 from "Assets/explore4.png"
import explore5 from "Assets/explore5.png"
import explore6 from "Assets/explore6.png"
import explore7 from "Assets/explore7.png"
import explore8 from "Assets/explore9.png"
import menu1 from "Assets/explore-menu-1.png"
import menu2 from "Assets/explore-menu-2.png"
import menu3 from "Assets/explore-menu-3.png"
import menu4 from "Assets/explore-menu-4.png"

const Explore = () => {
  const aliasDesa = useAtomValue(aliasDesaAtom)

  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm" gap={150}>
        <Group justify="center" gap={60} mr={25} mt={-50} p={0}>
          <ExploreMenuMobile
            image={explore1}
            title={`Profil ${aliasDesa}`}
            href="/profil"
          />
          <ExploreMenuMobile
            image={explore2}
            title="Infografis"
            href="/infografis"
          />
          <ExploreMenuMobile
            image={explore3}
            title="Cek DPT"
            href="https://cekdptonline.kpu.go.id/"
            newTab={true}
          />
          <ExploreMenuMobile
            image={explore4}
            title="IDM"
            href="/infografis/idm"
          />
        </Group>
        <Group justify="center" gap={60} mr={25} mt={-50} p={0}>
          <ExploreMenuMobile image={explore5} title="Berita" href="/berita" />
          <ExploreMenuMobile image={explore6} title="Belanja" href="/belanja" />
          <ExploreMenuMobile image={explore7} title="PPID" href="/ppid" />
          <ExploreMenuMobile
            image={explore8}
            title="Bansos"
            href="/infografis/bansos"
          />
        </Group>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Grid
        visibleFrom="sm"
        justify="center"
        align="center"
        gutter={"xl"}
        style={{
          overflow: "visible",
        }}
      >
        <Grid.Col span={6}>
          <Title tt={"uppercase"} fz={44} order={1} c={vars("color-primary-5")}>
            JELAJAHI {aliasDesa}
          </Title>
          <Text fz={20}>
            Melalui website ini Anda dapat menjelajahi segala hal yang terkait
            dengan{" "}
            <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>.
            Aspek pemerintahan, penduduk, demografi, potensi{" "}
            <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>, dan
            juga berita tentang{" "}
            <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>.
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Group>
              <ExploreMenu
                image={menu3}
                title={`Pasar ${aliasDesa}`}
                href="/belanja"
              />
              <ExploreMenu
                image={menu2}
                title="Cek DPT Online"
                href="https://cekdptonline.kpu.go.id/"
                newTab={true}
              />
            </Group>
            <Group justify="flex-end">
              <ExploreMenu
                image={menu1}
                title={`Berita ${aliasDesa}`}
                href="/berita"
              />
              <ExploreMenu
                image={menu4}
                title="Informasi Publik"
                href="/ppid"
              />
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
      {/* End Desktop */}
    </>
  )
}

type ExploreMenuProps = {
  image: string
  title: string
  href?: string
  newTab?: boolean
}

const ExploreMenu = ({
  image,
  title,
  href = "/",
  newTab,
}: ExploreMenuProps) => {
  return (
    <Box
      w={"40%"}
      p={10}
      style={() => ({
        cursor: "pointer",
        zIndex: 1,
      })}
    >
      <Link
        to={href}
        target={newTab ? "_blank" : ""}
        rel="noreferrer"
        style={{ textDecoration: "none", color: "#5A5E62" }}
      >
        <Box pos={"relative"}>
          <Box
            w={"100%"}
            h={160}
            bg={"#FFFFFF33"}
            pos={"absolute"}
            bottom={-20}
            style={{
              zIndex: -1,
              borderRadius: 5,
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          ></Box>
          <Box>
            <Stack justify="center" align="center" gap={"sm"}>
              <Image w={"80%"} src={image} alt="Other" />
              <Text
                ta="center"
                fw={"bold"}
                style={{
                  textTransform: "uppercase",
                }}
              >
                {title}
              </Text>
            </Stack>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

type ExploreMenuMobileProps = {
  image: string
  title: string
  bg?: React.ReactNode
  href?: string
  newTab?: boolean
}

const ExploreMenuMobile = ({
  image,
  title,
  bg = "#C3EBE3",
  href = "/",
  newTab,
}: ExploreMenuMobileProps) => {
  return (
    <Box
      w={25}
      p={0}
      m={0}
      style={() => ({
        cursor: "pointer",
        zIndex: 1,
      })}
      pos={"relative"}
    >
      <Link
        to={href}
        target={newTab ? "_blank" : ""}
        rel="noreferrer"
        style={{ textDecoration: "none", color: "#5A5E62" }}
      >
        <Box
          w={50}
          h={50}
          bg={`${bg}`}
          pos={"absolute"}
          // bottom={40}
          // left={15}
          style={{
            zIndex: -1,
            borderRadius: 10,
            // boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stack gap={0}>
            <Image w={60} src={image} alt="Other" />
            <Text ta="center" fz={11} lh={1}>
              {title}
            </Text>
          </Stack>
        </Box>
      </Link>
    </Box>
  )
}

export default Explore
