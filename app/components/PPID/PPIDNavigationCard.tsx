import { Box, Stack, Image, Text } from "@mantine/core"
import { Link } from "@remix-run/react"

interface Props {
  href: string
  title: string
  imageSrc: string
}
export const PPIDNavigationCard = ({ href, title, imageSrc }: Props) => {
  return (
    <Box
      visibleFrom="sm"
      w={"100%"}
      p={10}
      style={{ cursor: "pointer", zIndex: 1 }}
    >
      <Link to={href} style={{ textDecoration: "none", color: "#5A5E62" }}>
        <Box pos={"relative"}>
          <Box
            w={"100%"}
            h={160}
            bg={"#FFFFFF33"}
            pos={"absolute"}
            bottom={-5}
            style={{
              zIndex: 1,
              borderRadius: 5,
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          ></Box>
          <Box p={5} style={{ zIndex: 2 }}>
            <Stack justify="center" align="center" gap={"sm"}>
              <Image w={"80%"} src={imageSrc} alt="Other" />
              <Text
                ta="center"
                fw={"bold"}
                style={{ textTransform: "uppercase" }}
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
