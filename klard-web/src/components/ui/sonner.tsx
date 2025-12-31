"use client";

import { Toaster as SonnerToaster } from "sonner";

interface ToasterProps {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
}

/**
 * Klard-styled Toaster component
 */
export function Toaster({ position = "bottom-right" }: Readonly<ToasterProps>) {
  return (
    <SonnerToaster
      position={position}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "border-border bg-card shadow-lg rounded-xl",
          title: "text-card-foreground font-medium text-sm",
          description: "text-muted-foreground text-xs",
          actionButton: "bg-primary text-primary-foreground hover:bg-primary/90",
          cancelButton: "bg-muted text-muted-foreground hover:bg-muted/80",
          success: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50",
          error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50",
          warning: "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50",
          info: "border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/50",
        },
      }}
      data-slot="toast-provider"
    />
  );
}
