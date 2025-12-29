# Klard Design System - Light Theme Colors & Effects

> **Note:** Light theme is the default for everyday use. Celebration screens (block notifications, milestone achievements, shareable reports) render in the user's chosen theme. Both light and dark themes are designed to be screenshot-worthy with appropriate glow effects and contrast.

## Colors

### Primary Colors
- **Primary Color:** #0D7C7A (Deep Teal)
- **Primary Foreground:** #FFFFFF (White)

### Secondary Colors
- **Secondary Color:** #15B5B0 (Vibrant Teal)
- **Secondary Foreground:** #FFFFFF (White)

### Accent Colors
- **Accent Success:** #059669 (Dark Green) — Also used for **Block Celebrations**
- **Accent Warning:** #D97706 (Dark Amber)
- **Accent Error:** #DC2626 (Dark Coral) — **Actual failures only, NEVER for blocked charges**
- **Accent Foreground:** #FFFFFF (White)

### Block Celebration Note
Block celebrations (notifications, milestones, shareable screens) render in the user's current theme. Light theme celebrations use Success Green (#059669) with appropriate glow effects. See color specifications below for light theme celebration styling.

### Neutral Colors
- **Background:** #FFFFFF (Pure White)
- **Foreground:** #0F172A (Dark Navy)
- **Muted:** #F1F5F9 (Soft Gray)
- **Muted Foreground:** #64748B (Medium Slate)

### Card Colors
- **Card Background:** #FFFFFF (Pure White)
- **Card Foreground:** #0F172A (Dark Navy)
- **Popover Background:** #FFFFFF (Pure White)
- **Popover Foreground:** #0F172A (Dark Navy)

### Border & Input Colors
- **Border:** rgba(148, 163, 184, 0.2) (Slate with 20% opacity)
- **Input:** #F8FAFC (Near White)
- **Ring:** #0D7C7A (Deep Teal)

### Destructive Colors
- **Destructive:** #DC2626 (Dark Coral)
- **Destructive Foreground:** #FFFFFF (White)

---

## Border Radius & Effects

### Radius
- **Small:** 8px
- **Default:** 12px
- **Medium:** 16px
- **Large:** 24px
- **Full:** 9999px (Pill shape)

### Shadows
- **Shadow Color:** rgba(15, 23, 42, 0.1)

### Effects

#### Small Shadow (Cards on rest state)
- **X Position:** 0px
- **Y Position:** 1px
- **Blur:** 3px
- **Spread:** 0px
- **Color:** rgba(15, 23, 42, 0.08)

#### Medium Shadow (Cards on hover)
- **X Position:** 0px
- **Y Position:** 4px
- **Blur:** 12px
- **Spread:** 0px
- **Color:** rgba(15, 23, 42, 0.12)

#### Large Shadow (Elevated elements)
- **X Position:** 0px
- **Y Position:** 8px
- **Blur:** 24px
- **Spread:** 0px
- **Color:** rgba(15, 23, 42, 0.15)

#### Teal Glow Effect (Primary CTA buttons)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 20px
- **Spread:** 0px
- **Color:** rgba(13, 124, 122, 0.3)

#### Green Success Glow (Savings indicators)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 16px
- **Spread:** 0px
- **Color:** rgba(5, 150, 105, 0.2)

#### Amber Warning Glow (Alert states)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 16px
- **Spread:** 0px
- **Color:** rgba(217, 119, 6, 0.2)

#### Glassmorphism Effect (Cards and panels)
- **Background:** rgba(255, 255, 255, 0.8)
- **Backdrop Blur:** 12px
- **Border:** 1px solid rgba(148, 163, 184, 0.2)
- **Shadow X:** 0px
- **Shadow Y:** 2px
- **Shadow Blur:** 12px
- **Shadow Spread:** 0px
- **Shadow Color:** rgba(15, 23, 42, 0.08)

#### Focus Ring (Interactive elements)
- **X Position:** 0px
- **Y Position:** 0px
- **Blur:** 0px
- **Spread:** 3px
- **Color:** rgba(13, 124, 122, 0.4)

---

## Gradient Definitions

### Primary Gradient (CTA Buttons)
- **Start Color:** #0D7C7A (Deep Teal)
- **End Color:** #0A5F5D (Darker Teal)
- **Direction:** 135deg (Diagonal)

### Background Gradient (Hero sections)
- **Start Color:** #FFFFFF (Pure White)
- **End Color:** #F8FAFC (Near White)
- **Direction:** 180deg (Top to bottom)

### Success Gradient (Savings displays)
- **Start Color:** #059669 (Dark Green)
- **End Color:** #047857 (Darker Green)
- **Direction:** 135deg (Diagonal)

---

## Additional Light Theme Colors

### Surface Colors
- **Surface 1:** #FFFFFF (Pure White)
- **Surface 2:** #F8FAFC (Near White)
- **Surface 3:** #F1F5F9 (Soft Gray)
- **Surface 4:** #E2E8F0 (Light Slate)

### Text Colors
- **Text Primary:** #0F172A (Dark Navy)
- **Text Secondary:** #475569 (Slate)
- **Text Tertiary:** #64748B (Medium Slate)
- **Text Disabled:** #94A3B8 (Light Slate)

### Semantic Colors
- **Info Background:** #EFF6FF (Light Blue)
- **Info Foreground:** #1E40AF (Dark Blue)
- **Info Border:** #BFDBFE (Medium Blue)

- **Success Background:** #ECFDF5 (Light Green)
- **Success Foreground:** #065F46 (Dark Green)
- **Success Border:** #A7F3D0 (Medium Green)

- **Warning Background:** #FEF3C7 (Light Amber)
- **Warning Foreground:** #92400E (Dark Amber)
- **Warning Border:** #FDE68A (Medium Amber)

- **Error Background:** #FEF2F2 (Light Red)
- **Error Foreground:** #991B1B (Dark Red)
- **Error Border:** #FECACA (Medium Red)

### Interactive States
- **Hover Background:** #F8FAFC (Near White)
- **Active Background:** #F1F5F9 (Soft Gray)
- **Selected Background:** #E0F2F1 (Light Teal)
- **Disabled Background:** #F1F5F9 (Soft Gray)

---

## Opacity Values

### Backgrounds
- **Primary Opacity:** 100%
- **Secondary Opacity:** 80%
- **Muted Opacity:** 50%
- **Disabled Opacity:** 40%

### Borders
- **Default Border Opacity:** 20%
- **Hover Border Opacity:** 30%
- **Focus Border Opacity:** 50%

### Text
- **Primary Text Opacity:** 100%
- **Secondary Text Opacity:** 70%
- **Muted Text Opacity:** 50%
- **Disabled Text Opacity:** 40%

---

## Animation Transitions

### Duration
- **Fast:** 150ms
- **Default:** 300ms
- **Slow:** 800ms

### Easing
- **Default:** ease-in-out
- **Entrance:** ease-out
- **Exit:** ease-in
- **Bounce:** cubic-bezier(0.68, -0.55, 0.265, 1.55)

---

## Usage Notes

### Primary Color (#0D7C7A)
- Use for: Primary CTAs, active states, links, important icons
- Contrast ratio: 4.68:1 on white (WCAG AA compliant)
- Never use on: Low contrast backgrounds

### Secondary Color (#15B5B0)
- Use for: Hover states, secondary CTAs, accents
- Best paired with: White backgrounds or dark text
- Never use on: Light backgrounds without border

### Accent Success (#059669)
- Use for: Savings amounts, success messages, positive indicators
- Always ensure: Sufficient contrast (4.5:1 minimum)
- Pair with: Light green backgrounds for subtle emphasis

### Accent Warning (#D97706)
- Use for: Alerts, price increases, important notifications
- Background pairing: Light amber (#FEF3C7) for non-critical warnings
- Never use: As background color without sufficient contrast

### Accent Error (#DC2626)
- Use for: Error messages, critical actions, destructive buttons
- Background pairing: Light red (#FEF2F2) for error containers
- Use sparingly: Only for genuine errors or destructive actions
- **NEVER use for:** Blocked charges — blocks are CELEBRATIONS (render in dark theme)

### Background (#FFFFFF)
- Use for: Main page background, card backgrounds, modals
- Add shadows: For depth and hierarchy on white-on-white
- Consider: Subtle gray (#F8FAFC) for secondary surfaces

### Glassmorphism (Light Theme)
- Use for: Overlays, floating panels, navigation bars
- Always include: Subtle shadow for depth
- Background opacity: 80% for better content visibility
- Best on: Gradient backgrounds or images

### Border Colors
- Default: rgba(148, 163, 184, 0.2) for subtle separation
- Hover: rgba(148, 163, 184, 0.3) for interactive elements
- Focus: Use solid #0D7C7A for active focus states

---

## Contrast Ratios (WCAG Compliance)

### Text on White Background
- Dark Navy (#0F172A): 14.74:1 ✅ AAA
- Slate (#475569): 8.59:1 ✅ AAA
- Medium Slate (#64748B): 5.87:1 ✅ AA
- Deep Teal (#0D7C7A): 4.68:1 ✅ AA

### Text on Light Backgrounds
- Dark Navy on Soft Gray (#F1F5F9): 13.98:1 ✅ AAA
- Slate on Near White (#F8FAFC): 8.47:1 ✅ AAA

### Interactive Elements
- Deep Teal button on White: 4.68:1 ✅ AA Large Text
- White text on Deep Teal: 4.68:1 ✅ AA

---

## Light vs Dark Theme Toggle

### Recommended Approach
- Store preference in localStorage or system preference
- Use `prefers-color-scheme` media query for initial detection
- Smooth transition between themes (300ms)
- Persist user choice across sessions

### CSS Variables Setup
```css
:root {
  --primary: #0D7C7A;
  --background: #FFFFFF;
  --foreground: #0F172A;
  /* ... other light theme variables */
}

[data-theme="dark"] {
  --primary: #15B5B0;
  --background: #0F172A;
  --foreground: #F8FAFC;
  /* ... other dark theme variables */
}
```

---

## Accessibility Considerations

### Color Blindness
- Never rely on color alone for information
- Use icons + color for status indicators
- Provide text labels for color-coded elements

### High Contrast Mode
- Test with Windows High Contrast Mode
- Ensure borders remain visible
- Check focus indicators are clear

### Reduced Motion
- Respect `prefers-reduced-motion` media query
- Disable animations for sensitive users
- Keep essential transitions only