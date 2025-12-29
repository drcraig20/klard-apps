import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { ServiceLogo, type Service, type ServiceLogoSize } from './ServiceLogo';

/**
 * ServiceLogo component displays a service's logo or fallback initial.
 * It wraps the Avatar component with service-specific semantics and
 * accessibility labels. Used for displaying subscription service branding.
 */
const meta: Meta<typeof ServiceLogo> = {
  title: 'Layout/ServiceLogo',
  component: ServiceLogo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the logo',
    },
    service: {
      control: 'object',
      description: 'Service object with name and optional logoUrl',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around Avatar for displaying service logos with fallback to initials.',
      },
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample services
const netflixService: Service = {
  name: 'Netflix',
  logoUrl: 'https://logo.clearbit.com/netflix.com',
};

const spotifyService: Service = {
  name: 'Spotify',
  logoUrl: 'https://logo.clearbit.com/spotify.com',
};

const githubService: Service = {
  name: 'GitHub',
  logoUrl: 'https://logo.clearbit.com/github.com',
};

const customService: Service = {
  name: 'Acme Corp',
  // No logo URL - will show fallback
};

// Default service logo
export const Default: Story = {
  args: {
    service: netflixService,
    size: 'md',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg'] as ServiceLogoSize[]).map((size) => (
        <View key={size} style={{ alignItems: 'center' }}>
          <ServiceLogo service={netflixService} size={size} />
          <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {size}
          </Text>
        </View>
      ))}
    </View>
  ),
};

// With fallback (no logo URL)
export const WithFallback: Story = {
  args: {
    service: customService,
    size: 'md',
  },
};

// Multiple services
export const MultipleServices: Story = {
  render: () => {
    const services: Service[] = [
      { name: 'Netflix', logoUrl: 'https://logo.clearbit.com/netflix.com' },
      { name: 'Spotify', logoUrl: 'https://logo.clearbit.com/spotify.com' },
      { name: 'GitHub', logoUrl: 'https://logo.clearbit.com/github.com' },
      { name: 'Slack', logoUrl: 'https://logo.clearbit.com/slack.com' },
      { name: 'Notion', logoUrl: 'https://logo.clearbit.com/notion.so' },
    ];

    return (
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {services.map((service) => (
          <View key={service.name} style={{ alignItems: 'center' }}>
            <ServiceLogo service={service} size="md" />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
              {service.name}
            </Text>
          </View>
        ))}
      </View>
    );
  },
};

// Services with fallbacks
export const FallbackExamples: Story = {
  render: () => {
    const services: Service[] = [
      { name: 'Netflix' },
      { name: 'Spotify' },
      { name: 'Amazon Prime' },
      { name: 'Gym Membership' },
      { name: 'Cloud Storage' },
    ];

    return (
      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
        {services.map((service) => (
          <View key={service.name} style={{ alignItems: 'center', width: 80 }}>
            <ServiceLogo service={service} size="md" />
            <Text
              style={{
                marginTop: 8,
                fontSize: 12,
                color: '#666',
                textAlign: 'center',
              }}
            >
              {service.name}
            </Text>
          </View>
        ))}
      </View>
    );
  },
};

// In subscription list context
export const SubscriptionListItem: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      {[netflixService, spotifyService, githubService].map((service) => (
        <View
          key={service.name}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            gap: 12,
          }}
        >
          <ServiceLogo service={service} size="md" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {service.name}
            </Text>
            <Text style={{ color: '#666', fontSize: 14 }}>
              Monthly subscription
            </Text>
          </View>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>$12.99</Text>
        </View>
      ))}
    </View>
  ),
};

// In card header
export const CardHeader: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <ServiceLogo service={netflixService} size="lg" />
        <View>
          <Text style={{ fontWeight: '700', fontSize: 20 }}>Netflix</Text>
          <Text style={{ color: '#666' }}>Premium Plan</Text>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ color: '#666', fontSize: 12 }}>MONTHLY COST</Text>
          <Text style={{ fontWeight: '600', fontSize: 18 }}>$19.99</Text>
        </View>
        <View>
          <Text style={{ color: '#666', fontSize: 12 }}>NEXT BILLING</Text>
          <Text style={{ fontWeight: '600', fontSize: 18 }}>Jan 15</Text>
        </View>
      </View>
    </View>
  ),
};

// Size comparison with text
export const SizeComparison: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {(['xs', 'sm', 'md', 'lg'] as ServiceLogoSize[]).map((size) => (
        <View
          key={size}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <ServiceLogo service={netflixService} size={size} />
          <Text style={{ fontSize: size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'md' ? 16 : 20 }}>
            Size: {size}
          </Text>
        </View>
      ))}
    </View>
  ),
};
