import ky from "ky"

export namespace SetCookieToken {
  export interface Payload {
    accessToken: string
    redirectTo: string
  }

  export const post = async (payload: Payload) => {
    const url = new URL(window.location.origin)
    url.pathname = "/api/token"
    return ky.post(url.href, {
      throwHttpErrors: false,
      credentials: "include",
      json: {
        access_token: payload.accessToken,
        redirect_to: payload.redirectTo,
      },
    })
  }
}
