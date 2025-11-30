import { GithubIcon, GoogleIcon } from "@/components/icons"
import { Button, FieldSeparator } from "@/components/ui"

export const AuthButtonsContainer = () => {
  return (
    <div className="grid gap-4">
      <FieldSeparator>Or continue with</FieldSeparator>

      <div className="grid gap-1.5">
        <Button type="button" variant="outline">
          <GithubIcon />
          GitHub
        </Button>

        <Button type="button" variant="outline">
          <GoogleIcon />
          Google
        </Button>
      </div>
    </div>
  )
}
