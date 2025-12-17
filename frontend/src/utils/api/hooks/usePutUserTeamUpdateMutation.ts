import { useMutation } from "@tanstack/react-query"

import type { PutUpdateTeamRequestConfig } from "@/utils/api/requests/user/team/update"

import { putUpdateTeam } from "@/utils/api/requests/user/team/update"
import { queryClient } from "@/utils/lib"

export const usePutUserTeamUpdateMutation = (
  settings?: MutationSettings<PutUpdateTeamRequestConfig, typeof putUpdateTeam>,
) =>
  useMutation({
    mutationKey: ["putUpdateTeam"],
    mutationFn: ({ params, config }) =>
      putUpdateTeam({ params, config: { ...settings?.config, ...config } }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getUserTeam"] })
      return data
    },
    ...settings?.options,
  })
