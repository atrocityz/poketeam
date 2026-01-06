import { GithubIcon, GoogleIcon, SpinnerIcon } from "@/components/icons"
import { Button, FieldSeparator } from "@/components/ui"

import { useOAuthPopup } from "./hooks"

interface AuthButtonsContainerProps {
  isLoading: boolean
}

export const AuthButtonsContainer = ({
  isLoading,
}: AuthButtonsContainerProps) => {
  const { openOAuthPopup, loadingProvider, isOAuthLoading } = useOAuthPopup()

  const isDisabled = isLoading || isOAuthLoading

  return (
    <div className="grid gap-4">
      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="grid gap-1.5">
        <Button
          aria-label="Sign in with GitHub"
          disabled={isDisabled}
          type="button"
          variant="outline"
          onClick={() => openOAuthPopup("github")}
        >
          {loadingProvider === "github" ? (
            <SpinnerIcon className="animate-spin" />
          ) : (
            <GithubIcon />
          )}
          GitHub
        </Button>

        <Button
          aria-label="Sign in with Google"
          disabled={isDisabled}
          type="button"
          variant="outline"
          onClick={() => openOAuthPopup("google")}
        >
          {loadingProvider === "google" ? (
            <SpinnerIcon className="animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          Google
        </Button>
      </div>
    </div>
  )
}
