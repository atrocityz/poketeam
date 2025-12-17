import { useQuery } from "@tanstack/react-query"

import { getTeam } from "../requests/user/team"

export const useGetUserTeamQuery = (settings?: QuerySettings<typeof getTeam>) =>
  useQuery({
    queryKey: ["getUserTeam"],
    queryFn: () => getTeam(settings?.config),
    ...settings?.options,
  })
