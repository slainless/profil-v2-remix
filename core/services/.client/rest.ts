import ky from "ky"
import urlJoin from "url-join"

export const rest = ky.create({
  prefixUrl: urlJoin(import.meta.env.VITE_GRAPHQL_ENDPOINT!, "../"),
})
