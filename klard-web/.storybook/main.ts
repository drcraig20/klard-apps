// Storybook configuration for klard-web (Storybook 10)
// Source: Context7 - storybookjs/storybook Next.js setup
import * as path from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(process.cwd(), "next.config.ts"),
    },
  },
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  docs: {
    autodocs: true,
  },
  staticDirs: ["../public"],
};

export default config;
