// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line unused-imports/no-unused-vars
export interface NamedApiResource<T = unknown> {
  name: string
  url: string
}

export interface NamedApiResourceList<T> {
  count: number
  next: string
  previous: string
  results: T[]
}
