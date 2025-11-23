export interface User {
  createdAt: Date
  email: string
  id: string
  login?: string
  password: string
  updatedAt: Date
}

export interface AuthResponse {
  accessToken: string
}

export interface ErrorResponse {
  error: string
  message: string
  statusCode: number
}
