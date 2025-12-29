// Storybook preview configuration for klard-web
// Source: Context7 - storybookjs/storybook Tailwind CSS theme setup
import type { Preview, Renderer } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

// Critical: Load Tailwind CSS + Klard design tokens
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    docs: { toc: true },
    backgrounds: { disable: true }, // Use theme switcher instead
  },
  decorators: [
    withThemeByDataAttribute<Renderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;