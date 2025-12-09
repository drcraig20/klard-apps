# Onboarding Screens Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace existing onboarding carousel with 3-screen flow (Welcome → Add Subscription → BurnerCard Tutorial) for both web and mobile.

**Architecture:** Multi-step onboarding with shared data models in commons, platform-specific UI components, and Zustand for local subscription storage. TDD approach with parallel subagents for independent tasks.

**Tech Stack:** Next.js 16 (App Router), Expo 54 (Expo Router, expo-haptics, expo-image, expo-blur, expo-linking), Zustand, Zod 4, shadcn/ui (web)

---

## MANDATORY: Klard Design System Compliance

**ALL screens must follow the Klard Design System exactly. Read `docs/design/Klard Design System.md` before implementation.**

### Color Tokens (Theme-Aware)

Be theme aware, rely on existing styling first before creating new ones

### Typography Scale

| Element | Size | Weight |
|---------|------|--------|
| H1 (Headlines) | 32px | Semi-Bold |
| H2 | 24px | Semi-Bold |
| Body | 16-17px | Regular |
| Label | 14px | Medium |

### Effects

- **Glassmorphism**: 60% opacity dark surfaces + 12px backdrop blur + soft teal glows
- **Spacing**: 4/8 grid (4, 8, 12, 16, 24, 32px)
- **Card padding**: 20-24px
- **Touch targets**: Minimum 44px
- **Focus states**: Teal ring on focus
- **Motion**: ease-in-out, 150-300ms durations

---

## MANDATORY: Localization Ready

**ALL user-facing strings must be added to the existing translation files for i18n support.**

### String Extraction Requirements

1. **Add onboarding strings to existing `commons/src/locales/en.ts`** under a new `onboarding` key
2. Export typed constants following the existing pattern
3. Use placeholders for dynamic content: `{{serviceName}}`
4. Import and use via existing i18n setup in `klard-web/src/lib/i18n/` and `klard-mobile/src/lib/i18n/`

### Screen Content (Exact Copy - Extract These)

**Screen 5 - Slide 1 (Track):**
```
headline: "Track all your subscriptions"
body: "See every recurring payment in one place. Never forget a renewal date again."
```

**Screen 5 - Slide 2 (Protect):**
```
headline: "Protect with BurnerCards"
body: "Create virtual cards that auto-block unwanted charges. You control the rules."
```

**Screen 5 - Slide 3 (Save):**
```
headline: "Save money automatically"
body: "Get alerts on price increases and discover cheaper alternatives."
```

**Screen 6 - Add Subscription:**
```
stepIndicator: "Step 1 of 2 — Add your first subscription"
headline: "What's your first subscription?"
searchPlaceholder: "Search services..."
labels.price: "Price"
labels.billingCycle: "Billing Cycle"
labels.renewalDate: "Next Renewal Date"
labels.category: "Category"
labels.cancellationUrl: "Cancellation Link (optional)"
helperText.autoFilled: "Auto-filled • Edit if incorrect"
helperText.optional: "Optional"
buttons.addSubscription: "Add Subscription"
buttons.skipForNow: "Skip for now"
toast.success: "🎉 {{serviceName}} added! You'll be reminded before it renews."
```

**Screen 7 - BurnerCard Tutorial:**
```
stepIndicator: "Step 2 of 2 — Protect your payments"
headline: "Meet BurnerCards"
body: "Create disposable virtual cards that protect you from unwanted charges. Set limits, expiry rules, and auto-block renewals."
features[0].title: "Block surprise renewals"
features[0].description: "Stop charges before they happen"
features[1].title: "Set expiry rules"
features[1].description: "Cards auto-lock after trial periods"
features[2].title: "Control spending limits"
features[2].description: "Cap how much a service can charge"
buttons.createBurnerCard: "Create Your First BurnerCard"
buttons.exploreDashboard: "Explore Dashboard First"
```

**Navigation:**
```
skip: "Skip"
next: "Next"
getStarted: "Get Started"
```

---

## MANDATORY: Theme Support

**ALL components must support both Light and Dark themes.**

### Implementation Requirements

1. Use CSS variables / Tailwind design tokens, NOT hardcoded colors
2. Web: Use Tailwind CSS with `dark:` variants
3. Mobile: Use existing theme context with dynamic StyleSheet values
4. Test both themes before marking complete
5. Illustrations must adapt to theme (teal glows should be visible in both)

---

## MANDATORY: Expo SDK First (Mobile)

**ALL mobile tasks MUST prefer Expo SDK packages over React Native core:**

| Instead of (React Native) | Use (Expo SDK) |
|--------------------------|----------------|
| `react-native` ScrollView for carousel | `expo-router` + Animated.ScrollView |
| `react-native` Image | `expo-image` |
| `react-native` Linking | `expo-linking` |
| `react-native-async-storage` | Consider `expo-secure-store` or zustand-persist |
| Custom haptics | `expo-haptics` |
| Custom blur | `expo-blur` (BlurView) |
| Date picker | `@react-native-community/datetimepicker` (Expo compatible) |
| Navigation | `expo-router` (NOT react-navigation directly) |

**Before ANY mobile implementation:**
1. Fetch Expo SDK 54 docs: `mcp__context7__get-library-docs` with `/websites/expo_dev_versions_v54_0_0`
2. Check if Expo SDK has a package for the functionality
3. Only use React Native core if NO Expo equivalent exists

---

## SOLID Compliance

| Component | SRP | OCP | LSP | ISP | DIP |
|-----------|-----|-----|-----|-----|-----|
| WelcomeCarousel | Renders carousel only | Slides via data array | Handles all slide types | Single props interface | Depends on slide data |
| SubscriptionForm | Handles form input | Services via config | N/A | Form + Service props | Depends on store interface |
| BurnerCardTutorial | Renders tutorial | Features via data | N/A | Single props interface | Depends on navigation |
| SubscriptionStore | Manages subscriptions | Add/remove via actions | N/A | Store interface only | Abstract storage |

---

## Pre-Implementation Requirements

**MANDATORY: Before ANY implementation task, the implementing agent MUST:**

1. Read `klard-web/AGENTS.md` for web tasks
2. Read `klard-mobile/AGENTS.md` for mobile tasks
3. Use Context7 MCP to fetch library docs:
   - `mcp__context7__resolve-library-id` → `mcp__context7__get-library-docs`
4. Activate required skills:
   - `Skill(solid-design-principles)` for all components
   - `Skill(superpowers:test-driven-development)` for all code
   - `Skill(frontend-design)` for UI components
   - `Skill(nextjs-app-router)` for web routes
5. Follow TDD: Write failing test → Watch it fail → Minimal code → Watch it pass → Commit

---

## Task 1: Commons - Subscription Types & Validation

**Files:**
- Create: `commons/src/types/subscription.ts`
- Create: `commons/src/validation/subscription.ts`
- Create: `commons/src/constants/categories.ts`
- Modify: `commons/src/index.ts`
- Test: `commons/src/__tests__/subscription.test.ts`

**Pre-requisites:**
- Fetch Zod 4 docs: `mcp__context7__get-library-docs` with `/colinhacks/zod` topic `schema validation object enum`

**Step 1:** Write failing tests for subscription schema validation

**Step 2:** Run tests to verify they fail

**Step 3:** Implement types and Zod schemas:
- `Subscription` interface with all fields
- `SubscriptionCategory` literal union type
- `PopularService` interface
- `AddSubscriptionSchema` Zod schema
- `SUBSCRIPTION_CATEGORIES` constant

**Step 4:** Run tests to verify they pass

**Step 5:** Build commons and commit
```bash
cd commons && pnpm build
git add . && git commit -m "feat(commons): add subscription types and validation schemas"
```

---

## Task 2: Commons - Popular Services Data

**Files:**
- Create: `commons/src/data/popular-services.ts`
- Modify: `commons/src/index.ts`
- Test: `commons/src/__tests__/popular-services.test.ts`

**Step 1:** Write failing tests for popular services data structure

**Step 2:** Run tests to verify they fail

**Step 3:** Implement popular services array with 12 services:
- Netflix, Spotify, Amazon Prime, Adobe CC, YouTube Premium, Disney+
- HBO Max, iCloud, Microsoft 365, Dropbox, ChatGPT Plus, Gym/Fitness
- Include: id, name, defaultPrice, defaultCycle, category, cancellationUrl, color

**Step 4:** Run tests to verify they pass

**Step 5:** Build commons and commit
```bash
cd commons && pnpm build
git add . && git commit -m "feat(commons): add popular services data"
```

---

## Task 3: Web - Zustand Subscription Store

**Files:**
- Create: `klard-web/src/stores/subscription-store.ts`
- Test: `klard-web/src/__tests__/stores/subscription-store.test.ts`

**Pre-requisites:**
- Fetch Zustand docs: `mcp__context7__get-library-docs` with `/pmndrs/zustand` topic `persist store create typescript`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write failing tests for store actions (addSubscription, removeSubscription)

**Step 2:** Run tests to verify they fail

**Step 3:** Implement Zustand store with persist middleware (localStorage)

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(web): add subscription zustand store with persistence"
```

---

## Task 4: Mobile - Zustand Subscription Store

**Files:**
- Create: `klard-mobile/src/stores/subscriptionStore.ts`
- Test: `klard-mobile/src/__tests__/stores/subscriptionStore.test.ts`

**Pre-requisites:**
- Fetch Zustand docs: `mcp__context7__get-library-docs` with `/pmndrs/zustand` topic `persist store react native`
- Fetch Expo SDK 54 docs: `mcp__context7__get-library-docs` with `/websites/expo_dev_versions_v54_0_0` topic `expo-secure-store storage`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write failing tests for store actions

**Step 2:** Run tests to verify they fail

**Step 3:** Implement Zustand store with persist middleware
- Use AsyncStorage for non-sensitive subscription data (expo compatible)
- Mirror web implementation structure

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(mobile): add subscription zustand store with persistence"
```

---

## Task 5: Web - SVG Illustrations Components

**Files:**
- Create: `klard-web/src/components/onboarding/illustrations/track-illustration.tsx`
- Create: `klard-web/src/components/onboarding/illustrations/protect-illustration.tsx`
- Create: `klard-web/src/components/onboarding/illustrations/save-illustration.tsx`
- Create: `klard-web/src/components/onboarding/illustrations/index.ts`

**Pre-requisites:**
- Read `docs/design/Klard Design System.md` for colors and effects
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write component tests for each illustration (renders without error, has accessible attributes)

**Step 2:** Run tests to verify they fail

**Step 3:** Implement SVG illustrations as React components:
- TrackIllustration: Floating subscription cards with glassmorphism
- ProtectIllustration: Credit card with shield overlay
- SaveIllustration: Upward arrow with savings counter

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(web): add onboarding SVG illustrations"
```

---

## Task 6: Mobile - SVG Illustrations Components

**Files:**
- Create: `klard-mobile/src/components/onboarding/illustrations/TrackIllustration.tsx`
- Create: `klard-mobile/src/components/onboarding/illustrations/ProtectIllustration.tsx`
- Create: `klard-mobile/src/components/onboarding/illustrations/SaveIllustration.tsx`
- Create: `klard-mobile/src/components/onboarding/illustrations/index.ts`

**Pre-requisites:**
- Fetch react-native-svg docs via Context7 (or use expo's built-in SVG support)
- Read `docs/design/Klard Design System.md`
- Activate: `Skill(frontend-design)`

**Step 1:** Write component tests

**Step 2:** Run tests to verify they fail

**Step 3:** Implement SVG illustrations using react-native-svg (same visual design as web)

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(mobile): add onboarding SVG illustrations"
```

---

## Task 7: Web - Screen 5 Welcome Carousel

**Files:**
- Modify: `klard-web/src/app/onboarding/page.tsx` (replace existing)
- Create: `klard-web/src/components/onboarding/welcome-carousel.tsx`
- Test: `klard-web/src/__tests__/components/onboarding/welcome-carousel.test.tsx`

**Pre-requisites:**
- Fetch Next.js App Router docs: `mcp__context7__get-library-docs` with `/websites/nextjs_app` topic `navigation useRouter`
- Fetch shadcn/ui docs for Button component
- Activate: `Skill(nextjs-app-router)`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write failing tests:
- Renders 3 slides with correct content
- Pagination dots work
- "Next" advances slides
- "Get Started" on last slide navigates to /onboarding/add-subscription
- "Skip" navigates to dashboard

**Step 2:** Run tests to verify they fail

**Step 3:** Implement WelcomeCarousel component with:
- 3 slides (Track, Protect, Save) from data array (OCP)
- Swipeable navigation
- Pagination dots
- Skip button (top right)
- Next/Get Started button

**Step 4:** Update page.tsx to use new carousel

**Step 5:** Run tests to verify they pass

**Step 6:** Commit
```bash
git add . && git commit -m "feat(web): implement screen 5 welcome carousel"
```

---

## Task 8: Mobile - Screen 5 Welcome Carousel

**Files:**
- Modify: `klard-mobile/src/components/onboarding/OnboardingScreen.tsx` (replace existing)
- Modify: `klard-mobile/src/app/onboarding.tsx`
- Test: `klard-mobile/src/__tests__/components/onboarding/OnboardingScreen.test.tsx`

**Pre-requisites:**
- Fetch Expo SDK 54 docs: `mcp__context7__get-library-docs` with `/websites/expo_dev_versions_v54_0_0` topic `expo-router navigation push replace`
- Fetch Expo SDK 54 docs: topic `expo-haptics expo-blur expo-linear-gradient`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**EXPO SDK REQUIREMENTS:**
- Use `expo-router` for navigation (`router.push`, `router.replace`)
- Use `expo-haptics` for haptic feedback
- Use `expo-blur` (BlurView) for glassmorphism effects
- Use `expo-linear-gradient` for gradient backgrounds
- Use `react-native` Animated API (built-in, no alternative needed)

**Step 1:** Write failing tests for carousel behavior

**Step 2:** Run tests to verify they fail

**Step 3:** Update OnboardingScreen:
- Change to 3 slides (Track, Protect, Save)
- Update slide data array
- Use `router.push('/onboarding-subscription')` from expo-router for navigation
- Keep existing expo-haptics and expo-blur usage

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(mobile): implement screen 5 welcome carousel"
```

---

## Task 9: Web - Service Grid Component

**Files:**
- Create: `klard-web/src/components/onboarding/service-grid.tsx`
- Test: `klard-web/src/__tests__/components/onboarding/service-grid.test.tsx`

**Pre-requisites:**
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write failing tests:
- Renders 12 services on desktop
- Renders 8 services on mobile viewport
- Clicking service calls onSelect with service data
- Search filters services

**Step 2:** Run tests to verify they fail

**Step 3:** Implement ServiceGrid component:
- Responsive grid (12 on lg+, 8 on mobile)
- Service chips with logo placeholder and name
- Search input for filtering
- onSelect callback (ISP)

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(web): add service grid component"
```

---

## Task 10: Mobile - Service Grid Component

**Files:**
- Create: `klard-mobile/src/components/onboarding/ServiceGrid.tsx`
- Test: `klard-mobile/src/__tests__/components/onboarding/ServiceGrid.test.tsx`

**Pre-requisites:**
- Fetch Expo SDK 54 docs: `mcp__context7__get-library-docs` with `/websites/expo_dev_versions_v54_0_0` topic `expo-haptics TextInput Pressable`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**EXPO SDK REQUIREMENTS:**
- Use `expo-haptics` for selection feedback
- Use `react-native` Pressable (built-in, no expo alternative)
- Use `react-native` TextInput (built-in, no expo alternative)

**Step 1:** Write failing tests

**Step 2:** Run tests to verify they fail

**Step 3:** Implement ServiceGrid:
- 8 services (2 rows × 4)
- Pressable chips with `Haptics.selectionAsync()` on press
- TextInput for search filtering
- onSelect callback

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(mobile): add service grid component"
```

---

## Task 11: Web - Screen 6 Subscription Form

**Files:**
- Create: `klard-web/src/app/onboarding/add-subscription/page.tsx`
- Create: `klard-web/src/components/onboarding/subscription-form.tsx`
- Test: `klard-web/src/__tests__/components/onboarding/subscription-form.test.tsx`

**Pre-requisites:**
- Fetch shadcn/ui docs for Input, Select, Button components
- Fetch react-hook-form + zod resolver docs if using
- Activate: `Skill(nextjs-app-router)`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write failing tests:
- Initial state shows service selection
- Selecting service shows form
- Form validates with Zod schema
- Submit adds to store and navigates
- Skip navigates without adding

**Step 2:** Run tests to verify they fail

**Step 3:** Implement SubscriptionForm:
- Two states: selection and form
- ServiceGrid for selection
- Form fields: price, billingCycle, renewalDate, category, cancellationUrl
- Zod validation on submit
- Success toast on add
- Navigation to /onboarding/burnercard-tutorial

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(web): implement screen 6 add subscription form"
```

---

## Task 12: Mobile - Screen 6 Subscription Form

**Files:**
- Create: `klard-mobile/src/app/onboarding-subscription.tsx`
- Create: `klard-mobile/src/components/onboarding/SubscriptionForm.tsx`
- Test: `klard-mobile/src/__tests__/components/onboarding/SubscriptionForm.test.tsx`

**Pre-requisites:**
- Fetch Expo SDK 54 docs: `mcp__context7__get-library-docs` with `/websites/expo_dev_versions_v54_0_0` topic `expo-router expo-haptics TextInput`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**EXPO SDK REQUIREMENTS:**
- Use `expo-router` for navigation (`router.push('/onboarding-burnercard')`)
- Use `expo-haptics` for submit feedback (`Haptics.notificationAsync`)
- Use `@react-native-community/datetimepicker` for date picker (Expo compatible)
- Use `react-native` TextInput, View, ScrollView (built-in, no expo alternative)

**Step 1:** Write failing tests

**Step 2:** Run tests to verify they fail

**Step 3:** Implement SubscriptionForm:
- ServiceGrid integration
- Form with native TextInput components
- Date picker using @react-native-community/datetimepicker
- Zod validation from commons
- Haptic feedback on submit using expo-haptics
- Navigation using `router.push('/onboarding-burnercard')`

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(mobile): implement screen 6 add subscription form"
```

---

## Task 13: Web - Screen 7 BurnerCard Tutorial

**Files:**
- Create: `klard-web/src/app/onboarding/burnercard-tutorial/page.tsx`
- Create: `klard-web/src/components/onboarding/burnercard-tutorial.tsx`
- Test: `klard-web/src/__tests__/components/onboarding/burnercard-tutorial.test.tsx`

**Pre-requisites:**
- Activate: `Skill(nextjs-app-router)`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**Step 1:** Write failing tests:
- Renders headline and body
- Renders 3 feature highlights
- "Create BurnerCard" navigates to dashboard
- "Explore Dashboard" navigates to dashboard
- Both set hasOnboarded to true

**Step 2:** Run tests to verify they fail

**Step 3:** Implement BurnerCardTutorial:
- Illustration (card blocking charge)
- Headline and body text
- Feature highlights in glassmorphism card (OCP: data-driven)
- Two CTAs using existing useOnboarding hook

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(web): implement screen 7 burnercard tutorial"
```

---

## Task 14: Mobile - Screen 7 BurnerCard Tutorial

**Files:**
- Create: `klard-mobile/src/app/onboarding-burnercard.tsx`
- Create: `klard-mobile/src/components/onboarding/BurnerCardTutorial.tsx`
- Test: `klard-mobile/src/__tests__/components/onboarding/BurnerCardTutorial.test.tsx`

**Pre-requisites:**
- Fetch Expo SDK 54 docs: `mcp__context7__get-library-docs` with `/websites/expo_dev_versions_v54_0_0` topic `expo-blur expo-haptics expo-router`
- Activate: `Skill(frontend-design)`
- Activate: `Skill(solid-design-principles)`

**EXPO SDK REQUIREMENTS:**
- Use `expo-blur` (BlurView) for glassmorphism feature highlights card
- Use `expo-haptics` for button feedback (`Haptics.notificationAsync` on complete)
- Use `expo-router` for navigation via useOnboarding hook
- Use `expo-linear-gradient` for any gradient backgrounds

**Step 1:** Write failing tests

**Step 2:** Run tests to verify they fail

**Step 3:** Implement BurnerCardTutorial:
- Same content as web
- Native styling with BlurView from expo-blur for glassmorphism
- Haptic feedback on buttons using expo-haptics
- Navigation via existing useOnboarding hook (which uses expo-router)

**Step 4:** Run tests to verify they pass

**Step 5:** Commit
```bash
git add . && git commit -m "feat(mobile): implement screen 7 burnercard tutorial"
```

---

## Task 15: Integration Testing & Polish

**Files:**
- Test: `klard-web/src/__tests__/integration/onboarding-flow.test.tsx`
- Test: `klard-mobile/src/__tests__/integration/onboarding-flow.test.tsx`

**Pre-requisites:**
- Activate: `Skill(superpowers:verification-before-completion)`
- Activate: `Skill(klard-ui-verify)` for design system compliance

**Step 1:** Write integration tests for full flow:
- Start at /onboarding → complete carousel → add subscription → tutorial → dashboard
- Skip flow works at each step
- Subscription persists to store

**Step 2:** Run full test suite
```bash
pnpm test
```

**Step 3:** Run lint and build
```bash
pnpm lint
pnpm build
```

**Step 4:** Manual verification on both platforms

**Step 5:** Final commit
```bash
git add . && git commit -m "test: add onboarding integration tests"
```

---

## Parallel Execution Strategy

**Phase 1 (Sequential - Foundation):**
- Task 1: Commons types (required by all)
- Task 2: Commons services data (required by forms)

**Phase 2 (Parallel - Stores):**
- Task 3: Web Zustand store ║ Task 4: Mobile Zustand store

**Phase 3 (Parallel - Illustrations):**
- Task 5: Web illustrations ║ Task 6: Mobile illustrations

**Phase 4 (Parallel - Screen 5):**
- Task 7: Web carousel ║ Task 8: Mobile carousel

**Phase 5 (Parallel - Service Grid):**
- Task 9: Web service grid ║ Task 10: Mobile service grid

**Phase 6 (Parallel - Screen 6):**
- Task 11: Web subscription form ║ Task 12: Mobile subscription form

**Phase 7 (Parallel - Screen 7):**
- Task 13: Web tutorial ║ Task 14: Mobile tutorial

**Phase 8 (Sequential - Integration):**
- Task 15: Integration testing

---

## Verification Checklist

Before marking complete:

### Code Quality
- [ ] All tests pass (`pnpm test`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] No TypeScript errors

### Flow Testing
- [ ] Web flow works: /onboarding → add-subscription → burnercard-tutorial → dashboard
- [ ] Mobile flow works: /onboarding → onboarding-subscription → onboarding-burnercard → dashboard
- [ ] Skip works at every step (Screen 5, 6, 7)
- [ ] Subscription persists to local storage
- [ ] Success toast appears on subscription add

### Design System Compliance
- [ ] Colors match Klard Design System (teal primary, navy background)
- [ ] Typography correct (32px H1, 16-17px body, Inter/SF Pro)
- [ ] Glassmorphism effects present on cards (60% opacity, 12px blur)
- [ ] Spacing follows 4/8 grid
- [ ] Touch targets are at least 44px

### Theme Support
- [ ] Light theme works correctly on web
- [ ] Dark theme works correctly on web
- [ ] Light theme works correctly on mobile
- [ ] Dark theme works correctly on mobile
- [ ] Illustrations visible in both themes

### Localization
- [ ] All strings from `commons/src/locales/en.ts` onboarding section
- [ ] No hardcoded user-facing strings in components
- [ ] Dynamic content uses placeholders ({{serviceName}})

### Responsive & Accessibility
- [ ] Web works on mobile viewport
- [ ] Focus states present (teal ring)
- [ ] Aria labels on interactive elements
- [ ] Screen reader compatible