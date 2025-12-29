import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { SearchInput } from './SearchInput';

/**
 * SearchInput is a specialized input for search functionality with built-in
 * search icon, clear button, loading state, and debounced search callback.
 * It automatically handles debouncing to prevent excessive API calls.
 */
const meta: Meta<typeof SearchInput> = {
  title: 'Form/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when empty',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading indicator instead of clear button',
    },
    debounceMs: {
      control: 'number',
      description: 'Debounce delay in milliseconds',
    },
    editable: {
      control: 'boolean',
      description: 'Whether the input is editable (opposite of disabled)',
    },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, gap: 16, minWidth: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default search input
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchInput
        value={value}
        onChangeText={setValue}
        placeholder="Search..."
      />
    );
  },
};

// With a filled value
export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState('React Native');
    return (
      <SearchInput
        value={value}
        onChangeText={setValue}
        placeholder="Search..."
      />
    );
  },
};

// Loading state
export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('Searching...');
    return (
      <SearchInput
        value={value}
        onChangeText={setValue}
        placeholder="Search..."
        loading
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchInput
        value={value}
        onChangeText={setValue}
        placeholder="Search disabled..."
        editable={false}
      />
    );
  },
};

// With debounced search callback
export const WithDebouncedSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = useCallback((term: string) => {
      setIsSearching(true);
      setSearchTerm(term);
      // Simulate API call
      setTimeout(() => {
        setIsSearching(false);
      }, 500);
    }, []);

    return (
      <View style={{ gap: 12 }}>
        <SearchInput
          value={value}
          onChangeText={setValue}
          onSearch={handleSearch}
          placeholder="Type to search..."
          loading={isSearching}
          debounceMs={300}
        />
        <Text style={{ color: '#64748B', fontSize: 14 }}>
          Debounced search term: {searchTerm || '(none)'}
        </Text>
      </View>
    );
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchInput
        value={value}
        onChangeText={setValue}
        placeholder="Find subscriptions..."
      />
    );
  },
};

// Longer debounce delay
export const LongDebounce: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    return (
      <View style={{ gap: 12 }}>
        <SearchInput
          value={value}
          onChangeText={setValue}
          onSearch={setSearchTerm}
          placeholder="Search with 1s debounce..."
          debounceMs={1000}
        />
        <Text style={{ color: '#64748B', fontSize: 14 }}>
          Search triggers after 1 second: {searchTerm || '(waiting...)'}
        </Text>
      </View>
    );
  },
};

// Immediate search (no debounce)
export const ImmediateSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    return (
      <View style={{ gap: 12 }}>
        <SearchInput
          value={value}
          onChangeText={setValue}
          onSearch={setSearchTerm}
          placeholder="Instant search..."
          debounceMs={0}
        />
        <Text style={{ color: '#64748B', fontSize: 14 }}>
          Instant search term: {searchTerm || '(type to search)'}
        </Text>
      </View>
    );
  },
};

// Search with results simulation
export const WithResultsSimulation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const mockResults: Record<string, string[]> = {
      n: ['Netflix', 'Nintendo', 'Notion'],
      ne: ['Netflix', 'Newegg'],
      net: ['Netflix'],
      s: ['Spotify', 'Slack', 'Steam'],
      sp: ['Spotify', 'Spectrum'],
      a: ['Amazon Prime', 'Apple Music', 'Adobe CC'],
    };

    const handleSearch = useCallback((term: string) => {
      if (!term) {
        setResults([]);
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const key = term.toLowerCase();
        const found = mockResults[key] || [];
        setResults(found);
        setLoading(false);
      }, 300);
    }, []);

    return (
      <View style={{ gap: 12 }}>
        <SearchInput
          value={value}
          onChangeText={setValue}
          onSearch={handleSearch}
          placeholder="Try: n, s, a..."
          loading={loading}
        />
        {results.length > 0 && (
          <View style={{ gap: 4 }}>
            <Text style={{ color: '#0F172A', fontWeight: '600' }}>Results:</Text>
            {results.map((result) => (
              <Text key={result} style={{ color: '#64748B' }}>
                - {result}
              </Text>
            ))}
          </View>
        )}
        {value && !loading && results.length === 0 && (
          <Text style={{ color: '#64748B' }}>No results found</Text>
        )}
      </View>
    );
  },
};
