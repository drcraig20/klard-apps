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
})
