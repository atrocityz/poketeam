import type { CreateAxiosDefaults } from "axios"

import axios from "axios"
import Cookies from "js-cookie"

import { COOKIE } from "../constants"

const defaultOptions: CreateAxiosDefaults = {
  baseURL: "http://localhost:3000/api/",
}

export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
})

export const api = axios.create(defaultOptions)
export const apiWithAuth = axios.create(defaultOptions)

apiWithAuth.interceptors.request.use((config) => {
  const accessToken = Cookies.get(COOKIE.ACCESS_TOKEN) || null

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
