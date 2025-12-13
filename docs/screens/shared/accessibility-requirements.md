# Global Accessibility Requirements

All Klard screens must meet these standards.

---

## Keyboard Navigation (Web)

- All interactive elements must be focusable and operable via keyboard
- Tab order must follow logical reading order
- Focus states must be clearly visible
- No keyboard traps - users must be able to navigate away from any element

---

## Screen Reader Support (Both Platforms)

- All form fields must have associated labels
- Error messages must be announced when they appear (use `role="alert"` or `aria-live`)
- Button states (loading, disabled) must be communicated via `aria-disabled` or `aria-busy`
- Decorative images must have empty alt text (`alt=""`)
- Meaningful images must have descriptive alt text

---

## Touch Targets (Mobile)

- Minimum touch target size: 44x44 points
- Adequate spacing between adjacent touch targets (minimum 8pt)
- Interactive elements should have visible feedback on press

---

## Color and Contrast

- Text must meet WCAG AA contrast requirements:
  - 4.5:1 for body text (< 18pt or < 14pt bold)
  - 3:1 for large text (≥ 18pt or ≥ 14pt bold)
- Error states must not rely solely on color—include icons or text
- Focus indicators must have 3:1 contrast against adjacent colors

---

## Motion and Animation

- Respect user's `prefers-reduced-motion` preference
- Provide static alternatives for essential animations
- Animations should not flash more than 3 times per second
- Auto-playing animations should be pausable or complete within 5 seconds

---

## Form Accessibility

- All inputs must have visible labels (not just placeholders)
- Required fields must be indicated (use `aria-required="true"`)
- Error messages must be associated with their fields (use `aria-describedby`)
- Form submission feedback must be announced

---

## Platform-Specific Requirements

### iOS
- Support VoiceOver gestures
- Use semantic SwiftUI/UIKit accessibility APIs
- Support Dynamic Type for text scaling
- Honor Bold Text and Reduce Motion settings

### Android
- Support TalkBack navigation
- Use semantic Compose/View accessibility APIs
- Support font scaling preferences
- Honor animation scale settings

---

## Testing Checklist

Before marking a screen complete, verify:

- [ ] Screen reader can navigate all interactive elements
- [ ] All form fields announce their labels and states
- [ ] Error messages are announced when they appear
- [ ] Color contrast meets WCAG AA standards
- [ ] Touch targets are at least 44x44pt
- [ ] Animations respect reduced motion preference
- [ ] Keyboard navigation works logically (web)