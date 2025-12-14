export const getPokemonIdFromUrl = (url: string) => {
  const lastIndexOfSlash = url.lastIndexOf("/")

  const formattedUrl = url.slice(0, lastIndexOfSlash)

  return Number(formattedUrl.slice(formattedUrl.lastIndexOf("/") + 1))
}
