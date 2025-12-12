import React from "react"
import { render, screen } from "@testing-library/react-native"
import { StatusBadge } from "@/components/ui/StatusBadge"

jest.mock("@expo/vector-icons", () => {
  const React = require("react")
  const { Text } = require("react-native")
  return {
    Ionicons: ({ name, testID }: { name: string; testID?: string }) => (
      <Text testID={testID || "vector-icon"}>{name}</Text>
    ),
  }
})

const cases = [
  "active",
  "trial",
  "paused",
  "blocked",
  "cancelled",
  "locked",
  "expired",
  "pending",
] as const

describe("StatusBadge (mobile)", () => {
  it("renders label text", () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText("Active")).toBeTruthy()
  })

  it("passes through testID", () => {
    render(<StatusBadge status="active" testID="status-badge" />)
    expect(screen.getByTestId("status-badge")).toBeTruthy()
  })

  cases.forEach((status) => {
    it(`maps ${status} to label`, () => {
      const label = status.charAt(0).toUpperCase() + status.slice(1)
      render(<StatusBadge status={status} />)
      expect(screen.getByText(label)).toBeTruthy()
    })
  })

  it("renders icon via Ionicons", () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByTestId("status-icon")).toBeTruthy()
  })
})
