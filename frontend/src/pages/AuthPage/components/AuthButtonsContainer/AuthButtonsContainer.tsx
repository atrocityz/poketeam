import { GithubIcon, GoogleIcon } from "@/components/icons"
import { Button, FieldSeparator } from "@/components/ui"

interface AuthButtonsContainerProps {
  isLoading: boolean
}

export const AuthButtonsContainer = ({
  isLoading,
}: AuthButtonsContainerProps) => {
  const onOAuthButtonClick = (provider: "github" | "google") => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}/login`
  }

  return (
    <div className="grid gap-4">
      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="grid gap-1.5">
        <Button
          aria-label="Sign in with GitHub"
          disabled={isLoading}
          type="button"
          variant="outline"
          onClick={() => onOAuthButtonClick("github")}
        >
          <GithubIcon />
          GitHub
        </Button>

        <Button
          aria-label="Sign in with Google"
          disabled={isLoading}
          type="button"
          variant="outline"
          onClick={() => onOAuthButtonClick("google")}
        >
          <GoogleIcon />
          Google
        </Button>
      </div>
    </div>
  )
}
