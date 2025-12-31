import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import { getUser } from "../requests/user/me"

export const useGetUserQuery = (settings?: QuerySettings<typeof getUser>) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.GET_USER],
    queryFn: () => getUser(settings?.config),
    retry: false,
    ...settings?.options,
  })
