// Theme constants for klard-mobile
// Re-exports from styles for component usage

export const colors = {
  white: "#FFFFFF",
  slate: {
    200: "#E2E8F0",
    300: "#CBD5E1",
    500: "#64748B",
    900: "#0F172A",
  },
} as const;

// Re-export spacing and borderRadius from styles
export { spacing, borderRadius } from "@/styles/spacing";
