import type { Meta, StoryObj } from "@storybook/react";
import { ServiceLogo, type Service } from "./service-logo";

const meta = {
  title: "UI/ServiceLogo",
  component: ServiceLogo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Service logo component that displays a service avatar with fallback to the first letter of the service name. Built on the Avatar component.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Logo size variant",
    },
    service: {
      control: "object",
      description: "Service object with name and optional logoUrl",
    },
  },
} satisfies Meta<typeof ServiceLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Service with logo
const netflixService: Service = {
  name: "Netflix",
  logoUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=150&h=150&fit=crop",
};

// Service without logo (shows fallback)
const spotifyService: Service = {
  name: "Spotify",
};

// Default with logo
export const Default: Story = {
  args: {
    service: netflixService,
    size: "md",
  },
};

// With fallback (no logo URL)
export const WithFallback: Story = {
  args: {
    service: spotifyService,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "When no logoUrl is provided, displays the first letter of the service name.",
      },
    },
  },
};

// Extra small size
export const ExtraSmall: Story = {
  args: {
    service: netflixService,
    size: "xs",
  },
};

// Small size
export const Small: Story = {
  args: {
    service: netflixService,
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    service: netflixService,
    size: "md",
  },
};

// Large size
export const Large: Story = {
  args: {
    service: netflixService,
    size: "lg",
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <ServiceLogo service={netflixService} size="xs" />
        <span className="text-xs text-muted-foreground">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ServiceLogo service={netflixService} size="sm" />
        <span className="text-xs text-muted-foreground">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ServiceLogo service={netflixService} size="md" />
        <span className="text-xs text-muted-foreground">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ServiceLogo service={netflixService} size="lg" />
        <span className="text-xs text-muted-foreground">lg</span>
      </div>
    </div>
  ),
};

// Various services with fallbacks
export const ServiceVariety: Story = {
  render: () => {
    const services: Service[] = [
      { name: "Netflix" },
      { name: "Spotify" },
      { name: "Amazon Prime" },
      { name: "Disney+" },
      { name: "YouTube Premium" },
      { name: "HBO Max" },
    ];

    return (
      <div className="flex flex-wrap gap-4">
        {services.map((service) => (
          <div key={service.name} className="flex flex-col items-center gap-2">
            <ServiceLogo service={service} size="md" />
            <span className="text-xs text-muted-foreground">{service.name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Various subscription services showing fallback initials.",
      },
    },
  },
};

// Subscription list context
export const SubscriptionListContext: Story = {
  render: () => {
    const subscriptions = [
      { service: { name: "Netflix" }, price: "$15.99/mo" },
      { service: { name: "Spotify" }, price: "$9.99/mo" },
      { service: { name: "Disney+" }, price: "$7.99/mo" },
    ];

    return (
      <div className="space-y-3 max-w-sm">
        {subscriptions.map((sub) => (
          <div
            key={sub.service.name}
            className="flex items-center gap-3 p-3 border border-border rounded-lg"
          >
            <ServiceLogo service={sub.service} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-medium">{sub.service.name}</p>
              <p className="text-xs text-muted-foreground">{sub.price}</p>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "ServiceLogo used in a subscription list context.",
      },
    },
  },
};

// With custom className
export const WithCustomClassName: Story = {
  args: {
    service: spotifyService,
    size: "lg",
    className: "ring-2 ring-primary ring-offset-2",
  },
};
