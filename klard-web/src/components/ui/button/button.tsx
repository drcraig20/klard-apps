import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariants } from "./button.styles"

export interface ButtonProps
  extends React.ComponentProps<"button">,
    ButtonVariants {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
}

type ChildElementProps = {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClassName = cn(
    buttonVariants({ variant, size }),
    fullWidth && "w-full",
    className
  )
  const isDisabled = disabled || loading

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<ChildElementProps>
    const childClassName = childElement.props.className
    const content = (
      <>
        {iconPosition === "left" && !loading && icon}
        {loading ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          childElement.props.children
        )}
        {iconPosition === "right" && !loading && icon}
      </>
    )

    return (
      <Slot
        data-slot="button"
        className={cn(baseClassName, childClassName)}
        {...props}
      >
        {React.cloneElement(childElement, { disabled: isDisabled }, content)}
      </Slot>
    )
  }

  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={baseClassName}
      disabled={isDisabled}
      {...props}
    >
      {iconPosition === "left" && !loading && icon}
      {loading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        children
      )}
      {iconPosition === "right" && !loading && icon}
    </Comp>
  )
}

export { Button }
