import ky from "ky"
import urlJoin from "url-join"

export const rest = ky.create({
  prefixUrl: urlJoin(process.env.VITE_GRAPHQL_ENDPOINT!, "../"),
  headers: {
    Authorization: "Bearer " + process.env.VITE_GRAPHQL_ACCESS_WEBTOKEN,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formData = (obj: Record<string, any>) => {
  const form = new FormData()
  for (const key in obj) {
    form.append(key, obj[key])
  }
  return form
}
