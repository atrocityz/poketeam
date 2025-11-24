import { useProfile } from "@/components/Profile/useProfile"

import { Layout } from "../../components/layouts/Layout"

export const ProfilePage = () => {
  const { isLoading, profile } = useProfile()

  if (!profile && !isLoading) return null

  return (
    <Layout>
      <div>
        <div>{profile?.email}</div>
        <div>{profile?.login}</div>
      </div>
    </Layout>
  )
}
