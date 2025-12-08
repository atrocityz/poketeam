import { GithubIcon, GoogleIcon } from "@/components/icons"
import { Button, FieldSeparator } from "@/components/ui"

import { useOAuth } from "./hooks/useOAuth"

interface AuthButtonsContainerProps {
  isLoading: boolean
}

export const AuthButtonsContainer = ({
  isLoading,
}: AuthButtonsContainerProps) => {
  const { openOAuthPopup } = useOAuth()

  return (
    <div className="grid gap-4">
      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="grid gap-1.5">
        <Button
          aria-label="Sign in with GitHub"
          disabled={isLoading}
          type="button"
          variant="outline"
          onClick={() => openOAuthPopup("github")}
        >
          <GithubIcon />
          GitHub
        </Button>

        <Button
          aria-label="Sign in with Google"
          disabled={isLoading}
          type="button"
          variant="outline"
          onClick={() => openOAuthPopup("google")}
        >
          <GoogleIcon />
          Google
        </Button>
      </div>
    </div>
  )
}
