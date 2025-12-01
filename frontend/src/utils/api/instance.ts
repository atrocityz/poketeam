import type { CreateAxiosDefaults } from "axios"

import axios from "axios"
import Cookies from "js-cookie"

import { COOKIE } from "../constants"
import { postRefreshTokens } from "./requests/auth/refresh"

const defaultOptions: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
}

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
})

export const api = axios.create(defaultOptions)
export const apiWithAuth = axios.create(defaultOptions)

apiWithAuth.interceptors.request.use((request) => {
  const accessToken = Cookies.get(COOKIE.ACCESS_TOKEN) || null

  if (request?.headers && accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }

  return request
})

apiWithAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await postRefreshTokens()

        const { accessToken } = response.data

        Cookies.set(COOKIE.ACCESS_TOKEN, accessToken)

        return apiWithAuth.request(originalRequest)
      } catch {
        Cookies.remove(COOKIE.ACCESS_TOKEN)
      }
    }

    Cookies.remove(COOKIE.ACCESS_TOKEN)
    throw error
  },
)
