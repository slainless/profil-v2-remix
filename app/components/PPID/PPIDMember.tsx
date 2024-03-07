import { Carousel } from "@mantine/carousel"
import { Box, Card, Image, Stack, Text, Title } from "@mantine/core"

import { vars } from "Theme/artifact/vars.mjs"

export const PPIDMember = () => {
  return (
    <Stack gap={50}>
      <Stack gap={0}>
        <Title fz={{ base: 20, sm: 44 }} c={vars("color-primary-4")}>
          PPID PELAKSANA
        </Title>
        <Text fz={{ base: "md", sm: 20 }}>Petugas pelaksana</Text>
      </Stack>
      <Card
        radius={"sm"}
        shadow="sm"
        p={{ sm: "xl" }}
        mt={{ base: -30, sm: 0 }}
      >
        <Stack gap={"xl"}>
          <Text fz={{ base: "md", sm: 22 }}>
            Website ini merupakan ruang layanan online bagi pemohon informasi
            publik yang setiap saat dapat diakses oleh masyarakat. Dan ini
            merupakan salah satu wujud implementasi keterbukaan informasi publik
            yang diterapkan Pemerintah Desa Senga Selatan, Kecamatan Belopa,
            Kabupaten Luwu, Provinsi Sulawesi Selatan.
          </Text>
          <Text fz={{ base: "md", sm: 22 }}>
            Selaras dengan amanat UU Nomor 14 Tahun 2008 tentang Keterbukaan
            Informasi Publik, Pemerintah Desa Senga Selatan sebagai badan publik
            berupaya secara maksimal memenuhi hak masyarakat atas informasi
            publik dengan konsep layanan yang cepat, mudah, efektif dan
            akuntabel.
          </Text>
          <Text fz={{ base: "md", sm: 22 }} fw={"bold"}>
            Alamat: Jl. Andi Benni No. 27, Dusun Kalobang, Desa Senga Selatan,
            Kecamatan Belopa, Kabupaten Luwu
          </Text>
        </Stack>
      </Card>

      <Carousel
        slideSize={{ base: "40%", sm: "25%" }}
        align={"start"}
        slideGap={"sm"}
        loop
        withControls={false}
      >
        <Carousel.Slide>
          <Card
            ta={"center"}
            bg={"#4A977E"}
            m={0}
            p={0}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                w={"100%"}
                h={{ base: 150, sm: 350 }}
                alt="Norway"
              />
            </Card.Section>
            <Box py={{ base: 5, sm: 20 }}>
              <Title fz={{ base: 14, sm: 18 }} c="white">
                Fahmy Nd
              </Title>
              <Text fz={{ base: 12, sm: 16 }} c="white">
                Kepala Desa
              </Text>
            </Box>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide>
          <Card
            ta={"center"}
            bg={"#4A977E"}
            m={0}
            p={0}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                w={"100%"}
                h={{ base: 150, sm: 350 }}
                alt="Norway"
              />
            </Card.Section>
            <Box py={{ base: 5, sm: 20 }}>
              <Title fz={{ base: 14, sm: 18 }} c="white">
                Fahmy Nd
              </Title>
              <Text fz={{ base: 12, sm: 16 }} c="white">
                Kepala Desa
              </Text>
            </Box>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide>
          <Card
            ta={"center"}
            bg={"#4A977E"}
            m={0}
            p={0}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                w={"100%"}
                h={{ base: 150, sm: 350 }}
                alt="Norway"
              />
            </Card.Section>
            <Box py={{ base: 5, sm: 20 }}>
              <Title fz={{ base: 14, sm: 18 }} c="white">
                Fahmy Nd
              </Title>
              <Text fz={{ base: 12, sm: 16 }} c="white">
                Kepala Desa
              </Text>
            </Box>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide>
          <Card
            ta={"center"}
            bg={"#4A977E"}
            m={0}
            p={0}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                w={"100%"}
                h={{ base: 150, sm: 350 }}
                alt="Norway"
              />
            </Card.Section>
            <Box py={{ base: 5, sm: 20 }}>
              <Title fz={{ base: 14, sm: 18 }} c="white">
                Fahmy Nd
              </Title>
              <Text fz={{ base: 12, sm: 16 }} c="white">
                Kepala Desa
              </Text>
            </Box>
          </Card>
        </Carousel.Slide>
        <Carousel.Slide>
          <Card
            ta={"center"}
            bg={"#4A977E"}
            m={0}
            p={0}
            shadow="sm"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                w={"100%"}
                h={{ base: 150, sm: 350 }}
                alt="Norway"
              />
            </Card.Section>
            <Box py={{ base: 5, sm: 20 }}>
              <Title fz={{ base: 14, sm: 18 }} c="white">
                Fahmy Nd
              </Title>
              <Text fz={{ base: 12, sm: 16 }} c="white">
                Kepala Desa
              </Text>
            </Box>
          </Card>
        </Carousel.Slide>
      </Carousel>
    </Stack>
  )
}
