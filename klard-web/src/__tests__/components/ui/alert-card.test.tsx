import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { AlertCard } from "@/components/ui/alert-card"

const baseAlert = {
  id: "1",
  type: "renewal" as const,
  title: "Netflix renewal",
  body: "Renews in 3 days",
  timestamp: new Date("2024-01-01T12:00:00Z"),
  read: false,
}

describe("AlertCard", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2024-01-02T12:00:00Z"))
  })

  describe("Rendering", () => {
    it("renders title, body, relative time, and unread dot", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} />)
      expect(screen.getByText("Netflix renewal")).toBeInTheDocument()
      expect(screen.getByText("Renews in 3 days")).toBeInTheDocument()
      expect(screen.getByText("1 day ago")).toBeInTheDocument()
      expect(screen.getByLabelText(/unread/i)).toBeInTheDocument()
    })

    it("should have data-slot attribute", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} />)
      expect(document.querySelector('[data-slot="alert-card"]')).toBeInTheDocument()
    })

    it("hides unread dot when alert.read is true", () => {
      render(<AlertCard alert={{ ...baseAlert, read: true }} onPress={vi.fn()} />)
      expect(screen.queryByLabelText(/unread/i)).not.toBeInTheDocument()
    })
  })

  describe("Alert Types", () => {
    const types = [
      { type: "renewal", tone: "info" },
      { type: "payment_failed", tone: "error" },
      { type: "service_blocked", tone: "error" },
      { type: "new_charge", tone: "warning" },
      { type: "card_expiring", tone: "warning" },
      { type: "system", tone: "info" },
    ] as const

    types.forEach(({ type, tone }) => {
      it(`applies ${tone} tone for ${type}`, () => {
        render(
          <AlertCard
            alert={{ ...baseAlert, type }}
            onPress={vi.fn()}
          />
        )
        const card = document.querySelector('[data-slot="alert-card"]')
        if (tone === "info") {
          expect(card).toHaveClass(/blue/)
        } else if (tone === "warning") {
          expect(card).toHaveClass(/amber/)
        } else if (tone === "error") {
          expect(card).toHaveClass(/red/)
        }
      })
    })
  })

  describe("Keyboard Accessibility", () => {
    it("responds to Enter key", () => {
      const onPress = vi.fn()
      render(<AlertCard alert={baseAlert} onPress={onPress} />)
      const card = document.querySelector('[data-slot="alert-card"]')
      fireEvent.keyDown(card!, { key: "Enter" })
      expect(onPress).toHaveBeenCalledOnce()
    })

    it("responds to Space key", () => {
      const onPress = vi.fn()
      render(<AlertCard alert={baseAlert} onPress={onPress} />)
      const card = document.querySelector('[data-slot="alert-card"]')
      fireEvent.keyDown(card!, { key: " " })
      expect(onPress).toHaveBeenCalledOnce()
    })

    it("sets tabIndex=0 when interactive", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} />)
      const card = document.querySelector('[data-slot="alert-card"]')
      expect(card).toHaveAttribute("tabIndex", "0")
    })
  })

  describe("Subscription", () => {
    it("renders subscription logo when provided", () => {
      const alert = {
        ...baseAlert,
        subscription: {
          name: "Netflix",
          logoUrl: "https://example.com/netflix.png",
        },
      }
      render(<AlertCard alert={alert} onPress={vi.fn()} />)
      const img = screen.getByAltText("Netflix")
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src")
    })

    it("renders subscription fallback when no logo", () => {
      const alert = {
        ...baseAlert,
        subscription: {
          name: "Spotify",
        },
      }
      render(<AlertCard alert={alert} onPress={vi.fn()} />)
      expect(screen.getByText("S")).toBeInTheDocument()
      expect(screen.getByText("Spotify")).toBeInTheDocument()
    })

    it("does not render subscription chip when not provided", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} />)
      // Subscription name should not be visible when subscription is not provided
      expect(screen.queryByText("Netflix")).not.toBeInTheDocument()
      expect(screen.queryByText("Spotify")).not.toBeInTheDocument()
    })
  })

  describe("Action Button", () => {
    it("renders CTA button when provided", () => {
      const onCtaPress = vi.fn()
      const alert = {
        ...baseAlert,
        ctaLabel: "Update Payment",
        onCtaPress,
      }
      render(<AlertCard alert={alert} onPress={vi.fn()} />)
      expect(screen.getByRole("button", { name: "Update Payment" })).toBeInTheDocument()
    })

    it("invokes CTA callback on click", () => {
      const onCtaPress = vi.fn()
      const alert = {
        ...baseAlert,
        ctaLabel: "Fix Now",
        onCtaPress,
      }
      render(<AlertCard alert={alert} onPress={vi.fn()} />)
      fireEvent.click(screen.getByRole("button", { name: "Fix Now" }))
      expect(onCtaPress).toHaveBeenCalledOnce()
    })

    it("does not propagate CTA click to card", () => {
      const onPress = vi.fn()
      const onCtaPress = vi.fn()
      const alert = {
        ...baseAlert,
        ctaLabel: "Fix",
        onCtaPress,
      }
      render(<AlertCard alert={alert} onPress={onPress} />)
      fireEvent.click(screen.getByRole("button", { name: "Fix" }))
      expect(onCtaPress).toHaveBeenCalledOnce()
      expect(onPress).not.toHaveBeenCalled()
    })
  })

  describe("Dismiss", () => {
    it("renders dismiss button when onDismiss provided", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} onDismiss={vi.fn()} />)
      expect(screen.getByLabelText("Dismiss alert")).toBeInTheDocument()
    })

    it("does not render dismiss button when onDismiss not provided", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} />)
      expect(screen.queryByLabelText("Dismiss alert")).not.toBeInTheDocument()
    })

    it("invokes onDismiss callback when clicked", () => {
      const onDismiss = vi.fn()
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} onDismiss={onDismiss} />)
      fireEvent.click(screen.getByLabelText("Dismiss alert"))
      expect(onDismiss).toHaveBeenCalledOnce()
    })

    it("does not propagate dismiss click to card", () => {
      const onPress = vi.fn()
      const onDismiss = vi.fn()
      render(<AlertCard alert={baseAlert} onPress={onPress} onDismiss={onDismiss} />)
      fireEvent.click(screen.getByLabelText("Dismiss alert"))
      expect(onDismiss).toHaveBeenCalledOnce()
      expect(onPress).not.toHaveBeenCalled()
    })
  })

  describe("Size Variants", () => {
    it("applies md (default) size", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} />)
      const card = document.querySelector('[data-slot="alert-card"]')
      expect(card).toHaveClass(/p-4/)
    })

    it("applies sm size when specified", () => {
      render(<AlertCard alert={baseAlert} onPress={vi.fn()} size="sm" />)
      const card = document.querySelector('[data-slot="alert-card"]')
      expect(card).toHaveClass(/p-3/)
    })
  })
})
