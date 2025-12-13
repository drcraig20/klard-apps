---
document_type: component_registry
title: Missing Components Registry
description: Tracks UI components specified in screen documents that don't yet exist in the codebase
last_updated: 2025-12-12
batch_coverage: 7
screens_analyzed:
  - screen-11-subscription-list-view
  - screen-12-subscription-detail-view
  - screen-13-add-edit-subscription-modal
  - screen-14-calendar-view
  - screen-15-email-connection-setup
  - screen-21-create-burnercard-step-3
  - screen-22-burnercard-detail-view
  - screen-23-card-rules-configuration
  - screen-24-alerts-center
  - screen-25-price-increase-alert-detail
  - screen-26-renewal-reminder-detail
  - screen-27-spend-analytics-dashboard
  - screen-28-savings-report-view
  - screen-29-export-modal
  - screen-30-alternative-finder
  - screen-31-settings
  - screen-32-profile-plan-management
  - screen-33-help-faq
  - screen-34-empty-states
missing_components:
  - name: Calendar
    platform: mobile
    priority: high
    complexity: medium
    blocks_screens: [14]
    recommended_library: "@marceloterreiro/flash-calendar"
    alternative_library: "react-native-calendars"
    status: not_started
  - name: Chart
    platform: both
    priority: high
    complexity: medium
    blocks_screens: [25, 27, 28]
    recommended_library_web: "shadcn/ui chart (recharts)"
    recommended_library_mobile: "victory-native-xl"
    alternative_library_mobile: "react-native-gifted-charts"
    notes: "Critical for Analytics Dashboard (27) and Savings Report (28). Supports line, bar, area, pie/donut charts."
    status: not_started
  - name: Separator
    platform: mobile
    priority: low
    complexity: low
    blocks_screens: []
    recommended_library: "none - use styled View"
    status: not_started
  - name: Accordion
    platform: both
    priority: medium
    complexity: low
    blocks_screens: [33]
    recommended_library_web: "shadcn/ui accordion (@radix-ui/react-accordion)"
    recommended_library_mobile: "@animatereactnative/accordion"
    alternative_library_mobile: "react-native-reusables (@rn-primitives/accordion)"
    notes: "Required for Help & FAQ screen (33). Web uses Radix primitives, mobile uses Reanimated."
    status: not_started
  - name: Illustration
    platform: both
    priority: medium
    complexity: medium
    blocks_screens: [34]
    recommended_library: "none - custom SVG/vector assets"
    notes: "12 illustration variants for Empty States. Web: SVG components. Mobile: SVG via react-native-svg or Lottie animations."
    status: not_started
total_missing: 5
web_complete: false
mobile_complete: false
---

# Missing Components Registry

This document tracks UI components that are specified in screen documents but don't yet exist in the codebase. Each entry includes platform, recommended solution, and implementation notes.

---

## Summary

| Component | Platform | Priority | Recommended Solution | Complexity | Blocks Screens |
|:----------|:---------|:---------|:---------------------|:-----------|:---------------|
| Calendar | Mobile | High | `@marceloterreiro/flash-calendar` | Medium | 14 |
| Chart | Both | **High** | Web: shadcn/ui chart, Mobile: `victory-native-xl` | Medium | 25, 27, 28 |
| Accordion | Both | Medium | Web: shadcn/ui, Mobile: `@animatereactnative/accordion` | Low | 33 |
| Illustration | Both | Medium | Custom SVG assets (12 variants) | Medium | 34 |
| Separator | Mobile | Low | Custom View with border styling | Low | — |

---

## Component Details

### 1. Calendar (Mobile)

**Status:** :x: Missing
**Platform:** React Native (Expo)
**Required By:** Screen 14 (Calendar View)
**Priority:** High (core subscription management feature)

#### Current State

- **Web:** :white_check_mark: Exists at `klard-web/src/components/ui/calendar.tsx`
  - Built on `react-day-picker` via shadcn/ui
  - Fully functional with range selection, month navigation, theming

- **Mobile:** :x: Does not exist
  - Path would be: `klard-mobile/src/components/ui/Calendar/Calendar.tsx`
  - No calendar-related package in current dependencies

#### Library Comparison

| Library | Expo Compatible | Performance | Features | Maintenance | Recommendation |
|:--------|:----------------|:------------|:---------|:------------|:---------------|
| `@marceloterreiro/flash-calendar` | Yes | Excellent | Month/List views, range selection, theming | Active | **Recommended** |
| `react-native-calendars` (Wix) | Yes | Good | Dot/period marking, extensive theming | Active | Good alternative |
| `@howljs/react-native-calendar-kit` | Yes | Good | Week/day views, events, drag-drop | Active | For scheduling UI |

#### Recommended: Flash Calendar

**Why Flash Calendar:**
1. **Performance:** Uses `@shopify/flash-list` under the hood - handles infinite scroll smoothly
2. **Simplicity:** Clean API matching Klard's month-view requirements
3. **Theming:** Full theme customization via `CalendarTheme` type
4. **Lightweight:** No native dependencies, pure JS implementation
5. **Expo Compatible:** Works with Expo managed workflow

**Installation:**
```bash
pnpm --filter klard-mobile add @marceloterreiro/flash-calendar
```

**Basic Usage:**
```tsx
import { Calendar, toDateId, useDateRange } from "@marceloterreiro/flash-calendar";
import { useState } from "react";
import { View } from "react-native";

const today = toDateId(new Date());

export function SubscriptionCalendar() {
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        calendarMonthId={today}
        calendarActiveDateRanges={[
          { startId: selectedDate, endId: selectedDate }
        ]}
        onCalendarDayPress={setSelectedDate}
      />
    </View>
  );
}
```

**For Infinite Scrolling List (Screen 14 requirement):**
```tsx
import { Calendar, useDateRange } from "@marceloterreiro/flash-calendar";

export function CalendarListView() {
  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

  return (
    <Calendar.List
      calendarActiveDateRanges={calendarActiveDateRanges}
      calendarInitialMonthId={toDateId(new Date())}
      onCalendarDayPress={onCalendarDayPress}
      calendarPastScrollRangeInMonths={12}
      calendarFutureScrollRangeInMonths={12}
    />
  );
}
```

**Theming for Klard Design System:**
```tsx
import { CalendarTheme } from "@marceloterreiro/flash-calendar";

const klardCalendarTheme: CalendarTheme = {
  rowMonth: {
    content: {
      color: "#0F172A", // foreground
      fontWeight: "600",
    },
  },
  itemWeekName: {
    content: { color: "#64748B" }, // muted-foreground
  },
  itemDayContainer: {
    activeDayFiller: {
      backgroundColor: "#0D7C7A", // primary
    },
  },
  itemDay: {
    idle: ({ isPressed }) => ({
      container: {
        backgroundColor: isPressed ? "#0D7C7A" : "transparent",
        borderRadius: 8,
      },
      content: {
        color: "#0F172A",
      },
    }),
    today: ({ isPressed }) => ({
      container: {
        borderColor: "#15B5B0", // secondary
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: isPressed ? "#0D7C7A" : "transparent",
      },
      content: {
        color: "#0D7C7A",
        fontWeight: "600",
      },
    }),
    active: ({ isEndOfRange, isStartOfRange }) => ({
      container: {
        backgroundColor: "#0D7C7A",
        borderTopLeftRadius: isStartOfRange ? 8 : 0,
        borderBottomLeftRadius: isStartOfRange ? 8 : 0,
        borderTopRightRadius: isEndOfRange ? 8 : 0,
        borderBottomRightRadius: isEndOfRange ? 8 : 0,
      },
      content: {
        color: "#FFFFFF",
      },
    }),
  },
};
```

#### Alternative: react-native-calendars (Wix)

**When to choose this instead:**
- Need dot/multi-dot marking for subscription indicators
- Need period marking for date ranges
- Prefer a more established library with extensive documentation

**Installation:**
```bash
pnpm --filter klard-mobile add react-native-calendars
```

**Basic Usage with Subscription Markers:**
```tsx
import { Calendar } from 'react-native-calendars';

// Mark renewal dates with dots
<Calendar
  markedDates={{
    '2024-12-15': {
      marked: true,
      dotColor: '#0D7C7A',
      selected: true,
      selectedColor: '#0D7C7A'
    },
    '2024-12-20': {
      marked: true,
      dotColor: '#D97706' // warning - renewal soon
    },
  }}
  onDayPress={(day) => console.log('selected day', day)}
  theme={{
    backgroundColor: '#FFFFFF',
    calendarBackground: '#FFFFFF',
    selectedDayBackgroundColor: '#0D7C7A',
    todayTextColor: '#0D7C7A',
    arrowColor: '#0D7C7A',
  }}
/>
```

---

### 2. Chart (Both Platforms)

**Status:** :x: Missing
**Platform:** Web and Mobile
**Required By:**
- Screen 25 (Price Increase Alert Detail) - price history visualization
- Screen 27 (Spend Analytics Dashboard) - spending trends, category breakdown (line, donut/bar charts)
- Screen 28 (Savings Report View) - savings timeline visualization
**Priority:** **High** (critical for analytics features in Batch 6)

#### Current State

- **Web:** :x: Does not exist
  - shadcn/ui provides Chart components built on Recharts
  - Can be added via `npx shadcn@latest add chart`

- **Mobile:** :x: Does not exist
  - Path would be: `klard-mobile/src/components/ui/Chart/Chart.tsx`
  - No chart-related package in current dependencies

#### Chart Types Required

| Screen | Chart Types Needed |
|--------|-------------------|
| Screen 25 | Line chart (price history over time) |
| Screen 27 | Line chart (spending trend), Donut/Pie (category breakdown), Bar chart (top subscriptions) |
| Screen 28 | Timeline/Area chart (savings over time), optional bar breakdown |

#### Web Implementation: shadcn/ui Chart

shadcn/ui provides a complete charting solution built on Recharts with `ChartContainer`, `ChartTooltip`, and `ChartLegend` components.

**Installation:**
```bash
npx shadcn@latest add chart
```

**Basic Line Chart for Price History:**
```tsx
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const priceHistoryData = [
  { date: "2024-01", price: 9.99 },
  { date: "2024-06", price: 10.99 },
  { date: "2024-12", price: 12.99 },
  { date: "2025-01", price: 14.99 },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "#0D7C7A", // primary
  },
} satisfies ChartConfig;

export function PriceHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <LineChart data={priceHistoryData} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.slice(-2)} // Show month only
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="var(--color-price)"
          strokeWidth={2}
          dot={{ fill: "var(--color-price)" }}
        />
      </LineChart>
    </ChartContainer>
  );
}
```

#### Mobile Library Comparison

| Library | Expo Compatible | Performance | Skia-based | Features | Recommendation |
|:--------|:----------------|:------------|:-----------|:---------|:---------------|
| `victory-native-xl` | Yes | Excellent | Yes | Line, Bar, Area, animations | **Recommended** |
| `react-native-gifted-charts` | Yes | Good | No (SVG) | Many chart types, tooltips | Good alternative |
| `react-native-wagmi-charts` | Yes | Good | Yes | Line, candlestick, interactive | For financial data |

#### Recommended: victory-native-xl

**Why victory-native-xl:**
1. **Performance:** Uses Skia for GPU-accelerated rendering
2. **Animations:** Smooth spring/timing animations via Reanimated
3. **Modern:** Active development, great TypeScript support
4. **Lightweight:** Focused on Cartesian charts (line, bar, area)
5. **Expo Compatible:** Works with Expo managed workflow

**Installation:**
```bash
pnpm --filter klard-mobile add victory-native @shopify/react-native-skia react-native-reanimated
```

**Basic Line Chart for Price History:**
```tsx
import { View } from "react-native";
import { CartesianChart, Line, Scatter } from "victory-native";
import { useFont } from "@shopify/react-native-skia";

const priceHistoryData = [
  { month: 1, price: 9.99 },
  { month: 6, price: 10.99 },
  { month: 12, price: 12.99 },
  { month: 13, price: 14.99 },
];

export function PriceHistoryChart() {
  const font = useFont(require("@/assets/fonts/Inter-Medium.ttf"), 12);

  return (
    <View style={{ height: 200 }}>
      <CartesianChart
        data={priceHistoryData}
        xKey="month"
        yKeys={["price"]}
        padding={10}
        domainPadding={{ left: 10, right: 10 }}
        axisOptions={{
          font,
          tickCount: { x: 4, y: 5 },
          labelColor: { x: "#64748B", y: "#64748B" },
          lineColor: { grid: { x: "transparent", y: "#E2E8F0" } },
          formatYLabel: (value) => `$${value.toFixed(0)}`,
        }}
      >
        {({ points }) => (
          <>
            <Line
              points={points.price}
              color="#0D7C7A"
              strokeWidth={2}
              curveType="natural"
              animate={{ type: "spring" }}
            />
            <Scatter
              points={points.price}
              radius={4}
              color="#0D7C7A"
              animate={{ type: "spring" }}
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
}
```

#### Alternative: react-native-gifted-charts

**When to choose this instead:**
- Need more chart types (Pie, Donut, Stacked Bar, Radar)
- Prefer SVG-based rendering for web compatibility
- Need built-in tooltip components

**Installation:**
```bash
pnpm --filter klard-mobile add react-native-gifted-charts react-native-linear-gradient react-native-svg
```

**Basic Line Chart:**
```tsx
import { LineChart } from 'react-native-gifted-charts';

const priceHistoryData = [
  { value: 9.99, label: 'Jan' },
  { value: 10.99, label: 'Jun' },
  { value: 12.99, label: 'Dec' },
  { value: 14.99, label: 'Now' },
];

export function PriceHistoryChart() {
  return (
    <LineChart
      data={priceHistoryData}
      color="#0D7C7A"
      thickness={2}
      hideDataPoints={false}
      dataPointsColor="#0D7C7A"
      startFillColor="#0D7C7A"
      endFillColor="#FFFFFF"
      startOpacity={0.2}
      endOpacity={0}
      yAxisTextStyle={{ color: "#64748B" }}
      xAxisLabelTextStyle={{ color: "#64748B" }}
      formatYLabel={(value) => `$${value}`}
    />
  );
}
```

---

### 3. Separator (Mobile)

**Status:** :x: Missing (Low Priority)
**Platform:** React Native (Expo)
**Required By:** Screens 22, 23, 25 (visual separation in detail views)
**Priority:** Low (simple styling, not a blocking component)

#### Current State

- **Web:** :white_check_mark: Exists at `klard-web/src/components/ui/separator.tsx`
  - Built on Radix UI Separator via shadcn/ui

- **Mobile:** :x: Does not exist
  - Standard pattern: Use styled `View` with `borderBottomWidth`

#### Recommended: Custom Component (No Library)

A Separator in React Native is simply a styled View. No external library needed.

**Implementation:**
```tsx
// klard-mobile/src/components/ui/Separator/Separator.tsx
import { View, ViewStyle, StyleSheet } from "react-native";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  style?: ViewStyle;
}

export function Separator({
  orientation = "horizontal",
  style
}: SeparatorProps) {
  return (
    <View
      style={[
        orientation === "horizontal"
          ? styles.horizontal
          : styles.vertical,
        style,
      ]}
      accessibilityRole="separator"
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: "#E2E8F0", // border color
    width: "100%",
    marginVertical: 16,
  },
  vertical: {
    width: 1,
    backgroundColor: "#E2E8F0",
    height: "100%",
    marginHorizontal: 16,
  },
});
```

**With NativeWind (if using):**
```tsx
import { View } from "react-native";
import { cn } from "@/lib/utils";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  className
}: SeparatorProps) {
  return (
    <View
      className={cn(
        "bg-border",
        orientation === "horizontal"
          ? "h-px w-full my-4"
          : "w-px h-full mx-4",
        className
      )}
      accessibilityRole="separator"
    />
  );
}
```

---

### 4. Accordion (Both Platforms)

**Status:** :x: Missing
**Platform:** Web and Mobile
**Required By:** Screen 33 (Help & FAQ)
**Priority:** Medium (required for FAQ expandable sections)

#### Current State

- **Web:** :x: Does not exist
  - shadcn/ui provides Accordion built on Radix UI primitives
  - Can be added via `npx shadcn@latest add accordion`

- **Mobile:** :x: Does not exist
  - Path would be: `klard-mobile/src/components/ui/Accordion/Accordion.tsx`
  - No accordion-related package in current dependencies

#### Web Implementation: shadcn/ui Accordion

shadcn/ui provides a complete Accordion solution built on `@radix-ui/react-accordion` with animated height transitions.

**Installation:**
```bash
npx shadcn@latest add accordion
```

**Basic Usage for FAQ:**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How do I add a subscription?</AccordionTrigger>
        <AccordionContent>
          You can add a subscription manually by clicking "Add Subscription"
          or import from your email by connecting your inbox.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is a BurnerCard?</AccordionTrigger>
        <AccordionContent>
          A BurnerCard is a virtual card that protects you from unwanted
          charges by letting you control spending limits and block merchants.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

**Tailwind Animation Config (if not auto-added):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
}
```

#### Mobile Library Comparison

| Library | Expo Compatible | Performance | Animations | Features | Recommendation |
|:--------|:----------------|:------------|:-----------|:---------|:---------------|
| `@animatereactnative/accordion` | Yes | Excellent | Reanimated | Header, Expanded, Collapsed, Always | **Recommended** |
| `react-native-reusables` | Yes | Good | CSS-like | shadcn-style API | Good for consistency |
| Custom with LayoutAnimation | Yes | Good | Basic | Full control | For simple cases |

#### Recommended: @animatereactnative/accordion

**Why @animatereactnative/accordion:**
1. **Performance:** Powered by Reanimated for smooth 60fps animations
2. **Flexibility:** Separate `Expanded`, `Collapsed`, `Always` content zones
3. **HeaderIcon:** Built-in animated chevron rotation
4. **Expo Compatible:** Works with Expo managed workflow
5. **TypeScript:** Full type support

**Installation:**
```bash
pnpm --filter klard-mobile add @animatereactnative/accordion
```

**Basic Usage for FAQ:**
```tsx
import { Accordion } from '@animatereactnative/accordion';
import { View, Text, StyleSheet } from 'react-native';
import { ChevronUp } from 'lucide-react-native';

export function FAQAccordion() {
  return (
    <View style={styles.container}>
      <Accordion.Accordion style={styles.item}>
        <Accordion.Header>
          <View style={styles.header}>
            <Text style={styles.question}>How do I add a subscription?</Text>
            <Accordion.HeaderIcon>
              <ChevronUp size={20} color="#64748B" />
            </Accordion.HeaderIcon>
          </View>
        </Accordion.Header>
        <Accordion.Expanded>
          <View style={styles.content}>
            <Text style={styles.answer}>
              You can add a subscription manually by clicking "Add Subscription"
              or import from your email by connecting your inbox.
            </Text>
          </View>
        </Accordion.Expanded>
      </Accordion.Accordion>

      <Accordion.Accordion style={styles.item}>
        <Accordion.Header>
          <View style={styles.header}>
            <Text style={styles.question}>What is a BurnerCard?</Text>
            <Accordion.HeaderIcon>
              <ChevronUp size={20} color="#64748B" />
            </Accordion.HeaderIcon>
          </View>
        </Accordion.Header>
        <Accordion.Expanded>
          <View style={styles.content}>
            <Text style={styles.answer}>
              A BurnerCard is a virtual card that protects you from unwanted
              charges by letting you control spending limits.
            </Text>
          </View>
        </Accordion.Expanded>
      </Accordion.Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  item: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answer: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
  },
});
```

**Controlled Accordion (single open at a time):**
```tsx
import { useState } from 'react';

export function ControlledFAQ({ items }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <View style={{ gap: 12 }}>
      {items.map((item, index) => (
        <Accordion.Accordion
          key={index}
          isOpen={openIndex === index}
          onChange={(isOpen) => setOpenIndex(isOpen ? index : null)}
        >
          <Accordion.Header>
            <Text>{item.question}</Text>
          </Accordion.Header>
          <Accordion.Expanded>
            <Text>{item.answer}</Text>
          </Accordion.Expanded>
        </Accordion.Accordion>
      ))}
    </View>
  );
}
```

---

### 5. Illustration Assets (Both Platforms)

**Status:** :x: Missing
**Platform:** Web and Mobile
**Required By:** Screen 34 (Empty States)
**Priority:** Medium (12 variants needed for all empty state contexts)

#### Current State

- **Web:** :x: No illustration components exist
  - Path would be: `klard-web/src/components/ui/illustrations/`

- **Mobile:** :x: No illustration components exist
  - Path would be: `klard-mobile/src/components/ui/illustrations/`

#### Required Illustration Variants

| Variant | Context | Visual Concept |
|:--------|:--------|:---------------|
| no-subscriptions | Subscription List empty | Calendar with floating cards / empty wallet |
| no-burnercards | BurnerCard Overview empty (Saver+) | Credit card with shield |
| burnercards-locked | BurnerCard Overview (Basic/Pro) | Locked card with sparkles |
| no-alerts | Alerts Center empty | Bell with checkmark |
| no-search-results | Any search empty | Magnifying glass with question mark |
| no-transactions | BurnerCard Detail empty | Empty receipt |
| no-analytics | Analytics Dashboard new user | Empty chart/graph |
| no-savings | Savings Report new user | Piggy bank / coins |
| email-sync-empty | Email Scan no results | Inbox with magnifying glass |
| no-alternatives | Alternative Finder empty | Comparison icon with empty state |
| calendar-empty | Calendar View empty | Empty calendar |
| offline | Connection error | Cloud with disconnect icon |

#### Recommended Approach: Custom SVG Components

**Why Custom SVGs:**
1. **Brand Consistency:** Match Klard's teal/navy color palette exactly
2. **Theme Support:** Easy dark mode variants via CSS/props
3. **Performance:** SVGs are lightweight and scalable
4. **Accessibility:** Can include proper ARIA labels

**Web Implementation:**
```tsx
// klard-web/src/components/ui/illustrations/NoSubscriptions.tsx
import { SVGProps } from 'react';

interface IllustrationProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function NoSubscriptionsIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Calendar base */}
      <rect x="30" y="40" width="100" height="90" rx="8" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="2"/>
      {/* Calendar header */}
      <rect x="30" y="40" width="100" height="24" rx="8" fill="#0D7C7A"/>
      {/* Floating cards (abstract) */}
      <rect x="50" y="75" width="60" height="20" rx="4" fill="#15B5B0" opacity="0.3"/>
      <rect x="55" y="100" width="50" height="15" rx="4" fill="#15B5B0" opacity="0.2"/>
    </svg>
  );
}
```

**Mobile Implementation (react-native-svg):**
```tsx
// klard-mobile/src/components/ui/illustrations/NoSubscriptions.tsx
import Svg, { Rect } from 'react-native-svg';
import { useColorScheme } from 'react-native';

interface IllustrationProps {
  size?: number;
}

export function NoSubscriptionsIllustration({ size = 120 }: IllustrationProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      accessibilityRole="image"
      accessibilityLabel="No subscriptions"
    >
      {/* Calendar base */}
      <Rect
        x="30" y="40" width="100" height="90" rx="8"
        fill={isDark ? '#1E293B' : '#F1F5F9'}
        stroke={isDark ? '#334155' : '#E2E8F0'}
        strokeWidth="2"
      />
      {/* Calendar header */}
      <Rect x="30" y="40" width="100" height="24" rx="8" fill="#0D7C7A"/>
      {/* Floating cards */}
      <Rect x="50" y="75" width="60" height="20" rx="4" fill="#15B5B0" opacity="0.3"/>
      <Rect x="55" y="100" width="50" height="15" rx="4" fill="#15B5B0" opacity="0.2"/>
    </Svg>
  );
}
```

**Alternative: Lottie Animations**

For more engaging empty states, consider Lottie animations:

**Installation:**
```bash
# Web
pnpm --filter klard-web add lottie-react

# Mobile
pnpm --filter klard-mobile add lottie-react-native
```

**Mobile Usage:**
```tsx
import LottieView from 'lottie-react-native';

export function NoSubscriptionsIllustration() {
  return (
    <LottieView
      source={require('@/assets/animations/no-subscriptions.json')}
      autoPlay
      loop
      style={{ width: 120, height: 120 }}
    />
  );
}
```

**Design Resources:**
- Create illustrations in Figma with Klard colors
- Export as SVG for static, JSON for Lottie animations
- Use [unDraw](https://undraw.co/) or [Storyset](https://storyset.com/) for base illustrations
- Customize colors to match Klard palette (#0D7C7A primary, #15B5B0 secondary)

---

## Implementation Checklist

### Calendar (Mobile) - Priority: High

- [ ] Install `@marceloterreiro/flash-calendar`
- [ ] Create `klard-mobile/src/components/ui/Calendar/Calendar.tsx`
- [ ] Create `klard-mobile/src/components/ui/Calendar/index.ts` for exports
- [ ] Apply Klard design system theming
- [ ] Support dark mode via theme toggle
- [ ] Add accessibility labels for VoiceOver/TalkBack
- [ ] Test with Expo on both iOS and Android
- [ ] Add to `klard-mobile/src/components/ui/index.ts` barrel export
- [ ] Update this document status to :white_check_mark: Implemented

### Chart (Web) - Priority: High

- [ ] Run `npx shadcn@latest add chart`
- [ ] Verify chart CSS variables in `globals.css`
- [ ] Create reusable chart components:
  - [ ] `LineChart` wrapper for price history (Screen 25) and spending trends (Screen 27)
  - [ ] `DonutChart` wrapper for category breakdown (Screen 27)
  - [ ] `BarChart` wrapper for top subscriptions (Screen 27)
  - [ ] `AreaChart` wrapper for savings timeline (Screen 28)
- [ ] Apply Klard color theming (`#0D7C7A` primary, `#15B5B0` secondary)
- [ ] Add accessibility layer (`accessibilityLayer` prop)
- [ ] Add `ChartLegend` support for multi-series charts
- [ ] Test with dark mode

### Chart (Mobile) - Priority: High

- [ ] Install `victory-native`, `@shopify/react-native-skia`, `react-native-reanimated`
- [ ] Create `klard-mobile/src/components/ui/Chart/Chart.tsx`
- [ ] Create reusable chart components:
  - [ ] `LineChart` for price history (Screen 25) and spending trends (Screen 27)
  - [ ] `PieChart` for category breakdown (Screen 27) - use `react-native-gifted-charts` if pie needed
  - [ ] `BarChart` for horizontal category bars (Screen 27 mobile uses bars instead of donut)
  - [ ] `AreaChart` for savings timeline (Screen 28)
- [ ] Apply Klard design system colors (`#0D7C7A` primary, `#15B5B0` secondary)
- [ ] Add spring animations (`animate={{ type: "spring" }}`)
- [ ] Add `Scatter` points for interactive data points
- [ ] Configure `axisOptions` with proper formatting (`formatYLabel`, `formatXLabel`)
- [ ] Test animations on iOS and Android
- [ ] Add to `klard-mobile/src/components/ui/index.ts` barrel export

### Separator (Mobile) - Priority: Low

- [ ] Create `klard-mobile/src/components/ui/Separator/Separator.tsx`
- [ ] Create `klard-mobile/src/components/ui/Separator/index.ts`
- [ ] Support horizontal and vertical orientations
- [ ] Add `accessibilityRole="separator"`
- [ ] Add to barrel export

### Accordion (Web) - Priority: Medium

- [ ] Run `npx shadcn@latest add accordion`
- [ ] Verify Tailwind animation keyframes added to config
- [ ] Test expand/collapse animations
- [ ] Verify dark mode support
- [ ] Add accessibility labels for screen readers

### Accordion (Mobile) - Priority: Medium

- [ ] Install `@animatereactnative/accordion`
- [ ] Create `klard-mobile/src/components/ui/Accordion/Accordion.tsx`
- [ ] Create wrapper with Klard theming (colors, borders, spacing)
- [ ] Implement controlled mode for single-open behavior
- [ ] Add HeaderIcon with chevron rotation
- [ ] Test on iOS and Android
- [ ] Add to barrel export

### Illustration (Web) - Priority: Medium

- [ ] Create `klard-web/src/components/ui/illustrations/` directory
- [ ] Create 12 SVG illustration components (see variants table)
- [ ] Apply Klard color palette (#0D7C7A, #15B5B0)
- [ ] Support dark mode variants via CSS variables
- [ ] Add `aria-hidden="true"` for decorative images
- [ ] Create barrel export at `illustrations/index.ts`

### Illustration (Mobile) - Priority: Medium

- [ ] Verify `react-native-svg` is installed (already a dependency)
- [ ] Create `klard-mobile/src/components/ui/illustrations/` directory
- [ ] Create 12 SVG illustration components
- [ ] Support dark mode via `useColorScheme()`
- [ ] Add `accessibilityRole="image"` with labels
- [ ] Optional: Consider Lottie for animated variants
- [ ] Add to barrel export

---

## Web Components Status

| Component | Path | Status |
|:----------|:-----|:-------|
| **Chart** | `klard-web/src/components/ui/chart.tsx` | :x: Missing |
| **Accordion** | `klard-web/src/components/ui/accordion.tsx` | :x: Missing |
| **Illustration** | `klard-web/src/components/ui/illustrations/` | :x: Missing |

---

## Mobile Components Status

| Component | Path | Status |
|:----------|:-----|:-------|
| **Calendar** | `klard-mobile/src/components/ui/Calendar/Calendar.tsx` | :x: Missing |
| **Chart** | `klard-mobile/src/components/ui/Chart/Chart.tsx` | :x: Missing |
| **Separator** | `klard-mobile/src/components/ui/Separator/Separator.tsx` | :x: Missing |
| **Accordion** | `klard-mobile/src/components/ui/Accordion/Accordion.tsx` | :x: Missing |
| **Illustration** | `klard-mobile/src/components/ui/illustrations/` | :x: Missing |

---

*Last Updated: 2025-12-12*
*Batches Analyzed: 3, 5, 6, 7 (Screens 11-15, 21-34)*
