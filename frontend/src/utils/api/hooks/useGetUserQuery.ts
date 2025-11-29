import { useQuery } from "@tanstack/react-query"

import { getUser } from "../requests/auth/me"

export const useGetUserQuery = (settings?: QuerySettings<typeof getUser>) =>
  useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(settings?.config),
    retry: false,
    ...settings?.options,
  })
