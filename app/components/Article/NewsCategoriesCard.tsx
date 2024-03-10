import { Card, List, ListItem, Stack, Title } from "@mantine/core"

export const NewsCategoriesCard = () => {
  return (
    <Card>
      <Stack>
        <Title fz={24}>Kategori Berita</Title>
        <List>
          <ListItem>Clone or download repository from GitHub</ListItem>
          <ListItem>Install dependencies with yarn</ListItem>
          <ListItem>To start development server run npm start command</ListItem>
          <ListItem>
            Run tests to make sure your changes do not break the build
          </ListItem>
          <ListItem>Submit a pull request once you are done</ListItem>
        </List>
      </Stack>
    </Card>
  )
}
