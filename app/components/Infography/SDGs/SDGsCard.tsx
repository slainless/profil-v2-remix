import { Card, Box, Title, Stack, Image, Text } from "@mantine/core"

import { cardLayoutStyle } from "./SDGsCard.css"

export const SDGsCard = (props: {
  title: string
  value: number
  imageSrc: string
  id: number
}) => (
  <Card
    shadow="md"
    radius={"md"}
    h="100%"
    component="a"
    href={`#goal-${props.id}`}
  >
    <Box className={cardLayoutStyle}>
      <Image
        src={props.imageSrc}
        alt="other"
        style={{ gridArea: "image" }}
        w={{ base: 50, xs: 70 }}
      />
      <Title fz={{ base: 15, xs: 20 }} style={{ gridArea: "title" }}>
        {props.title}
      </Title>

      <Stack gap={0} ta={"end"} style={{ gridArea: "value" }}>
        <Text fz={{ base: 11, xs: 16 }}>Nilai</Text>
        <Text fz={{ base: 24, xs: 50 }} fw={700} style={{ lineHeight: 1 }}>
          {props.value}
        </Text>
      </Stack>
    </Box>
  </Card>
)
