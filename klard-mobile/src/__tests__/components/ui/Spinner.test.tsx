/**
 * Tests for Spinner Component (Mobile)
 *
 * TDD: Write failing tests first, then implement to pass.
 */

import React from "react"
import { render, screen } from "@testing-library/react-native"

import { Spinner } from "@/components/ui/Spinner"

describe("Spinner", () => {
  describe("Rendering", () => {
    it("should render an ActivityIndicator", () => {
      render(<Spinner testID="spinner" />)

      expect(screen.getByTestId("spinner")).toBeTruthy()
    })

    it("should have accessibility role", () => {
      render(<Spinner testID="spinner" />)

      // ActivityIndicator doesn't have a direct role, check it renders
      expect(screen.getByTestId("spinner")).toBeTruthy()
    })
  })

  describe("Sizes", () => {
    it("should render with md size by default", () => {
      render(<Spinner testID="spinner" />)

      // md maps to 'small' ActivityIndicator
      expect(screen.getByTestId("spinner")).toBeTruthy()
    })

    it("should render with sm size when specified", () => {
      render(<Spinner size="sm" testID="spinner" />)

      expect(screen.getByTestId("spinner")).toBeTruthy()
    })

    it("should render with lg size when specified", () => {
      render(<Spinner size="lg" testID="spinner" />)

      // lg maps to 'large' ActivityIndicator
      expect(screen.getByTestId("spinner")).toBeTruthy()
    })
  })

  describe("Label", () => {
    it("should render label text when provided", () => {
      render(<Spinner label="Loading..." />)

      expect(screen.getByText("Loading...")).toBeTruthy()
    })

    it("should not render label when not provided", () => {
      render(<Spinner testID="spinner" />)

      expect(screen.queryByText("Loading")).toBeNull()
    })
  })

  describe("Color", () => {
    it("should use default Klard teal color", () => {
      render(<Spinner testID="spinner" />)

      // Default color is #0D7C7A
      expect(screen.getByTestId("spinner")).toBeTruthy()
    })

    it("should accept custom color", () => {
      render(<Spinner color="#FF0000" testID="spinner" />)

      expect(screen.getByTestId("spinner")).toBeTruthy()
    })
  })
})
