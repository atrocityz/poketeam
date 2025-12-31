import { useMutation } from "@tanstack/react-query"

import type { PutUpdateTeamRequestConfig } from "@/utils/api/requests/user/team/update"

import { putUpdateTeam } from "@/utils/api/requests/user/team/update"
import { QUERY_KEYS } from "@/utils/constants/queries"

export const usePutUserTeamUpdateMutation = (
  settings?: MutationSettings<PutUpdateTeamRequestConfig, typeof putUpdateTeam>,
) =>
  useMutation({
    mutationKey: [QUERY_KEYS.USER.PUT_USER_TEAM_UPDATE],
    mutationFn: ({ params, config }) =>
      putUpdateTeam({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
