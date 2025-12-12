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
})
