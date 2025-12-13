---
screen: 27
name: Spend Analytics Dashboard
batch: 6
status: not_started
purpose: "Comprehensive financial insights showing spending trends and patterns."
user_story: "As a user, I want to understand my subscription spending patterns so I can make better financial decisions."
components:
  web:
    - name: Card
      path: klard-web/src/components/ui/card.tsx
      exists: true
    - name: Chart
      path: klard-web/src/components/ui/chart.tsx
      exists: false
      note: "Needs to be created - consider using recharts or chart.js library"
    - name: Badge
      path: klard-web/src/components/ui/badge/badge.tsx
      exists: true
    - name: Select
      path: klard-web/src/components/ui/select.tsx
      exists: true
    - name: DatePicker
      path: klard-web/src/components/ui/date-picker.tsx
      exists: true
    - name: Tabs
      path: klard-web/src/components/ui/tabs/tabs.tsx
      exists: true
    - name: Skeleton
      path: klard-web/src/components/ui/skeleton.tsx
      exists: true
    - name: Tooltip
      path: klard-web/src/components/ui/tooltip.tsx
      exists: true
    - name: SegmentedControl
      path: klard-web/src/components/ui/segmented-control/segmented-control.tsx
      exists: true
  mobile:
    - name: Card
      path: klard-mobile/src/components/ui/Card/Card.tsx
      exists: true
    - name: Chart
      path: klard-mobile/src/components/ui/Chart/Chart.tsx
      exists: false
      note: "Needs to be created - consider using react-native-chart-kit or victory-native"
    - name: Badge
      path: klard-mobile/src/components/ui/Badge/Badge.tsx
      exists: true
    - name: SelectField
      path: klard-mobile/src/components/ui/SelectField/SelectField.tsx
      exists: true
    - name: DatePicker
      path: klard-mobile/src/components/ui/DatePicker/DatePicker.tsx
      exists: true
    - name: TabBar
      path: klard-mobile/src/components/ui/TabBar/TabBar.tsx
      exists: true
      note: "TabBar exists but may need Tabs component for inline tabs"
    - name: Skeleton
      path: klard-mobile/src/components/ui/Skeleton/Skeleton.tsx
      exists: true
    - name: Tooltip
      path: klard-mobile/src/components/ui/Tooltip/Tooltip.tsx
      exists: true
    - name: SegmentedControl
      path: klard-mobile/src/components/ui/SegmentedControl/SegmentedControl.tsx
      exists: true
error_messages:
  - scenario: "Failed to load analytics data"
    message: "Couldn't load your analytics. Pull to refresh or try again later."
  - scenario: "No subscription data available"
    message: "Add some subscriptions to start tracking your spending."
  - scenario: "Custom date range invalid"
    message: "Please select a valid date range."
accessibility:
  extends: "../shared/accessibility-requirements.md"
  screen_specific:
    - Charts must have accessible descriptions summarizing the data
    - Chart data points must be navigable via keyboard with value announcements
    - Period selector must announce the current selection
    - Stat cards must announce their values and comparisons
    - Insights must be readable by screen readers with appropriate emphasis
---

# Screen 27: Spend Analytics Dashboard

## Purpose
Comprehensive financial insights showing spending trends and patterns.

## User Story
As a user, I want to understand my subscription spending patterns so I can make better financial decisions.

---

## Web Implementation

**Layout Approach:**

This screen lives within the main application shell, accessible via sidebar navigation. The design should present complex data in an accessible, actionable way without overwhelming users.

**Page Header:**

Display "Analytics" as H1. Include a period selector to the right: segmented control or dropdown with options:
- This Month (default)
- Last Month
- This Quarter
- This Year
- Custom Range (opens date picker)

**Summary Statistics Row:**

Display four key metrics as stat cards spanning the width:

**Card 1 — Total Spent:**
- Large number: "$187.43"
- Label: "This month"
- Comparison: "↓ 5% vs last month" (green if down, red if up)

**Card 2 — Subscription Count:**
- Large number: "12"
- Label: "Active subscriptions"
- Comparison: "+2 from last month"

**Card 3 — Average per Subscription:**
- Large number: "$15.62"
- Label: "Average cost"
- Context: "Your average is X% [above/below] typical"

**Card 4 — Projected Annual:**
- Large number: "$2,249"
- Label: "Projected yearly spend"
- Context: Based on current subscriptions

**Spending Trend Chart:**

Create a prominent line chart showing spending over time:

**Chart Configuration:**
- X-axis: Time periods (days for month view, weeks for quarter, months for year)
- Y-axis: Dollar amounts
- Line: Primary teal color with area fill (gradient)
- Data points: Dots at each period with hover tooltips

**Interactivity:**
- Hover/tap on data points shows exact amount and date
- Toggle between: Total Spend, By Category (multiple lines)
- Zoom/pan for longer time ranges

**Chart Legend:**
If showing multiple categories, display a legend below the chart with category colors.

**Category Breakdown:**

Display spending distribution by category using a donut/pie chart or horizontal bar chart:

**Donut Chart Approach:**
- Center shows total spend
- Segments colored by category
- Hover shows category name and amount
- Legend lists all categories with amounts and percentages

**Recommended Categories:**
- Streaming & Entertainment
- Productivity & Tools
- Gaming
- Health & Fitness
- Cloud & Storage
- Other

**Top Subscriptions Table:**

Show a ranked list of subscriptions by cost:

**Table Columns:**
- Rank (#)
- Service (logo + name)
- Category
- Monthly Cost
- % of Total
- Trend (up/down/stable indicator)

**Default Sort:** By cost (highest first)
**Alternative Sorts:** Alphabetical, Category, Trend

Limit to top 10 with "View All" link to full subscription list.

**Insights Section:**

Provide AI-generated or rule-based insights:

**Insight Cards:**
- "Your streaming spending increased 20% this quarter"
- "You have 3 subscriptions in the same category — consider consolidating"
- "Netflix is your longest-running subscription (24 months)"

Keep insights actionable and non-judgmental.

**Export Option:**

Include "Export Report" button in the header area that opens Screen 29 (Export Modal).

---

## Mobile Implementation

**Layout Approach:**

Analytics on mobile should prioritize the most important metrics and allow progressive disclosure of details. Avoid cramming desktop charts onto a small screen — redesign for mobile consumption patterns.

**Header:**

"Analytics" as large title. Period selector as a compact dropdown or segmented control below the title.

**Summary Cards:**

Display the four key metrics in a 2x2 grid:
- Total Spent | Subscriptions
- Average | Projected Annual

Each card should be tappable to see more detail or filter the view.

**Spending Trend:**

Simplify the chart for mobile:
- Horizontal scrollable if showing many data points
- Larger touch targets for data points
- Tap (not hover) to show tooltips
- Consider showing just the current period prominently with "View trend" to expand

**Alternative: Sparkline + Number**
Instead of full chart, show a sparkline next to the total spend number. Tap to see full chart in a detail view or bottom sheet.

**Category Breakdown:**

Use horizontal bars instead of pie/donut for better mobile readability:
- Category name on left
- Bar showing proportion
- Amount on right
- Sorted by amount (largest first)

Each bar should be tappable to filter subscriptions by that category.

**Top Subscriptions:**

Show as a simple list:
- Rank + Logo + Name
- Amount on right
- Tap to view subscription detail

Show top 5 with "See all" link.

**Insights:**

Display insights as horizontally scrollable cards or a vertical stack at the bottom. Keep them brief and actionable.

**Pull to Refresh:**

Support pull-to-refresh to update analytics data.

**iOS-Specific Considerations:**

- Use SF Pro for numbers, ensuring proper tabular figure alignment
- Charts should use iOS color palette
- Consider using Swift Charts-style animations
- Support Dynamic Type for accessibility

**Android-Specific Considerations:**

- Use Material charts styling
- Support gesture navigation
- Consider using MPAndroidChart-style interactions
- Ensure proper dark theme support for charts