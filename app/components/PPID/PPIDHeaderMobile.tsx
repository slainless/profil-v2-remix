import {
  Stack,
  Title,
  Group,
  Button,
  Text,
  BackgroundImage,
  Center,
  Card,
  Box,
  Image,
} from "@mantine/core"
import { Link } from "@remix-run/react"

import { vars } from "Theme/artifact/vars.mjs"

import berkalaImage from "Assets/informasi-secara-berkala-mobile.png"
import mertaImage from "Assets/informasi-serta-merta-mobile.png"
import saatImage from "Assets/informasi-setiap-saat-mobile.png"
import ppid from "Assets/ppid.png"

export const PPIDHeaderMobile = () => {
  return (
    <BackgroundImage src={ppid} h={250}>
      <Center p="md">
        <Stack>
          <Title fz={"xl"} c="white">
            Pejabat Pengelola Informasi dan Dokumentasi
          </Title>
          <Group justify="space-between">
            <Button
              variant="outline"
              color={vars("color-primary-4")}
              c={vars("color-black")}
              size={"md"}
              fz={14}
              bg={"white"}
              radius={"md"}
              component={Link}
              to="/ppid/dasar-hukum"
            >
              Dasar Hukum
            </Button>
            {/* <Button
              variant="outline"
              color="#398B7D"
              size={"md"}
              fz={14}
              c={"#398B7D"}
              bg={"white"}
              radius={"md"}
            >
              PPID Pelaksana
            </Button> */}
          </Group>
          <Card
            pos={"absolute"}
            mt={100}
            w={"91%"}
            top={150}
            h={120}
            radius={"lg"}
            shadow="md"
            withBorder
          >
            <Group justify="space-between" gap={60} mr={25} p={0}>
              <PPIDMenu
                image={berkalaImage}
                title="Informasi Secara Berkala"
                href="/ppid/berkala"
              />
              <PPIDMenu
                image={mertaImage}
                title="Informasi Serta Merta"
                href="/ppid/serta-merta"
              />
              <PPIDMenu
                image={saatImage}
                title="Informasi Setiap Saat"
                href="/ppid/setiap-saat"
              />
            </Group>
          </Card>
        </Stack>
      </Center>
    </BackgroundImage>
  )
}

type PPIDMenuProps = {
  image: string
  title: string
  bg?: React.ReactNode
  href?: string
}

const PPIDMenu = ({
  image,
  title,
  bg = "#C3EBE3",
  href = "/",
}: PPIDMenuProps) => {
  return (
    <Box
      w={30}
      p={0}
      m={0}
      style={{ cursor: "pointer", zIndex: 1 }}
      pos={"relative"}
    >
      <Link to={href} style={{ textDecoration: "none", color: "#5A5E62" }}>
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
