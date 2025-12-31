import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import { getTeam } from "../requests/user/team"

export const useGetUserTeamQuery = (settings?: QuerySettings<typeof getTeam>) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.GET_USER_TEAM],
    queryFn: () => getTeam(settings?.config),
    ...settings?.options,
  })
