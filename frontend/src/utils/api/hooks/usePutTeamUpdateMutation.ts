import { useMutation } from "@tanstack/react-query"

import type { PutUpdateTeamRequestConfig } from "@/utils/api/requests/team/update"

import { putUpdateTeam } from "@/utils/api/requests/team/update"
import { QUERY_KEYS } from "@/utils/constants/queries"

export const usePutTeamUpdateMutation = (
  settings?: MutationSettings<PutUpdateTeamRequestConfig, typeof putUpdateTeam>,
) =>
  useMutation({
    mutationKey: [QUERY_KEYS.TEAM.PUT_TEAM_UPDATE],
    mutationFn: ({ params, config }) =>
      putUpdateTeam({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
