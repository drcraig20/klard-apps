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
          toast: "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg rounded-xl",
          title: "text-slate-900 dark:text-slate-50 font-medium text-sm",
          description: "text-slate-500 dark:text-slate-400 text-xs",
          actionButton: "bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600",
          cancelButton: "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
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
