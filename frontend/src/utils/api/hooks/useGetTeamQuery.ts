import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/utils/constants/queries"

import { getTeam } from "../requests/team"

export const useGetTeamQuery = (settings?: QuerySettings<typeof getTeam>) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER.GET_USER_TEAM],
    queryFn: () => getTeam(settings?.config),
    ...settings?.options,
  })
