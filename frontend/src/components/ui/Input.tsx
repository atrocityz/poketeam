import { EyeIcon, EyeOffIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/utils/lib/utils"

import { Button } from "./Button"

const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      type={type}
      data-slot="input"
      {...props}
    />
  )
}

const PasswordInput = ({
  ref,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const disabled =
    props.value === "" || props.value === undefined || props.disabled

  return (
    <div className="relative">
      <Input
        ref={ref}
        className={cn("hide-password-toggle pr-10", className)}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        className="absolute top-0 right-0 h-full px-3 py-2"
        disabled={disabled}
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword && !disabled ? (
          <EyeIcon aria-hidden="true" className="h-4 w-4" />
        ) : (
          <EyeOffIcon aria-hidden="true" className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  )
}
PasswordInput.displayName = "PasswordInput"

export { Input, PasswordInput }
