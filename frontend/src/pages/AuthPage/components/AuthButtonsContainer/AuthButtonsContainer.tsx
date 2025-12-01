import { Link } from "react-router"

import { GithubIcon, GoogleIcon } from "@/components/icons"
import { Button, FieldSeparator } from "@/components/ui"

export const AuthButtonsContainer = () => (
  <div className="grid gap-4">
    <FieldSeparator>Or continue with</FieldSeparator>

    <div className="grid gap-1.5">
      <Button asChild type="button" variant="outline">
        <Link to={`${import.meta.env.VITE_API_URL}/auth/github/login`}>
          <GithubIcon />
          GitHub
        </Link>
      </Button>

      <Button asChild type="button" variant="outline">
        <Link to={`${import.meta.env.VITE_API_URL}/auth/google/login`}>
          <GoogleIcon />
          Google
        </Link>
      </Button>
    </div>
  </div>
)
