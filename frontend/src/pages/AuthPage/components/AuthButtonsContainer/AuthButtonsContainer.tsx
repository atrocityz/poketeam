import { Link } from "react-router"

import { GoogleIcon } from "@/components/icons"
import { Button, FieldSeparator } from "@/components/ui"

export const AuthButtonsContainer = () => (
  <div className="grid gap-4">
    <FieldSeparator>Or continue with</FieldSeparator>

    <div className="grid gap-1.5">
      {/* <Button type="button" variant="outline">
          <GithubIcon />
          GitHub
        </Button> */}

      <Button asChild type="button" variant="outline">
        <Link to={`${import.meta.env.VITE_API_URL}/auth/google/login`}>
          <GoogleIcon />
          Google
        </Link>
      </Button>
    </div>
  </div>
)
