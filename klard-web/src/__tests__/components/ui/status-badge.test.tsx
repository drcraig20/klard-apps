import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatusBadge } from "@/components/ui/status-badge"

const cases = [
  { status: "active", label: "Active", match: /green/ },
  { status: "trial", label: "Trial", match: /amber/ },
  { status: "paused", label: "Paused", match: /slate|gray/ },
  { status: "blocked", label: "Blocked", match: /red/ },
  { status: "cancelled", label: "Cancelled", match: /slate|gray/ },
  { status: "locked", label: "Locked", match: /amber/ },
  { status: "expired", label: "Expired", match: /slate|gray/ },
  { status: "pending", label: "Pending", match: /slate|gray/ },
] as const

describe("StatusBadge", () => {
  it("renders with data-slot", () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText("Active").closest('[data-slot="badge"]')).toBeInTheDocument()
  })

  cases.forEach(({ status, label }) => {
    it(`maps ${status} to label`, () => {
      render(<StatusBadge status={status} />)
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it("renders an icon", () => {
    render(<StatusBadge status="active" />)
    const badge = screen.getByText("Active").closest('[data-slot="badge"]')
    expect(badge?.querySelector(".shrink-0")).toBeInTheDocument()
  })

  it("passes className through", () => {
    render(<StatusBadge status="active" className="custom" />)
    expect(screen.getByText("Active").closest('[data-slot="badge"]')).toHaveClass("custom")
  })

  it("accepts data-testid", () => {
    render(<StatusBadge status="active" data-testid="status-badge" />)
    expect(screen.getByTestId("status-badge")).toBeInTheDocument()
  })
})
