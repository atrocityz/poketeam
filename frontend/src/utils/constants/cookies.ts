export const BASE_COOKIE_NAME = "poketeam"

export const COOKIE = {
  ACCESS_TOKEN: `${BASE_COOKIE_NAME}-accessToken`,
  REFRESH_TOKEN: `${BASE_COOKIE_NAME}-refreshToken`,
} as const
