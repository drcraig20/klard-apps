import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback } from "react";
import { SearchInput } from "./search-input";

const meta = {
  title: "Forms/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Search input with built-in debouncing, loading state, clear button, and search icon. Ideal for search fields, filters, and autocomplete inputs.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "Current search value (controlled)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner instead of clear button",
    },
    debounceMs: {
      control: "number",
      description: "Debounce delay in milliseconds (default: 300)",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default search input
export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Search...",
  },
};

// With value and clear button
export const WithValue: Story = {
  args: {
    value: "search term",
    onChange: () => {},
    placeholder: "Search...",
  },
};

// Loading state
export const Loading: Story = {
  args: {
    value: "searching",
    onChange: () => {},
    loading: true,
    placeholder: "Search...",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: "disabled search",
    onChange: () => {},
    disabled: true,
    placeholder: "Search...",
  },
};

// Custom placeholder
export const CustomPlaceholder: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Find products, brands, or categories...",
  },
};

// Custom debounce delay
export const CustomDebounce: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Search with 500ms debounce...",
    debounceMs: 500,
  },
};

// Interactive example with state
const InteractiveTemplate = () => {
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="max-w-sm space-y-4">
      <SearchInput
        value={value}
        onChange={setValue}
        onSearch={handleSearch}
        placeholder="Type to search..."
      />
      <div className="text-sm text-muted-foreground">
        <p>Input value: "{value}"</p>
        <p>Debounced search: "{searchTerm}"</p>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};

// With simulated API loading
const LoadingSimulationTemplate = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = useCallback((term: string) => {
    if (!term) {
      setResults([]);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults([
        `Result for "${term}" 1`,
        `Result for "${term}" 2`,
        `Result for "${term}" 3`,
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="max-w-sm space-y-4">
      <SearchInput
        value={value}
        onChange={setValue}
        onSearch={handleSearch}
        loading={loading}
        placeholder="Search and wait for results..."
      />
      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((result, i) => (
            <li
              key={i}
              className="p-2 bg-muted rounded text-sm"
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const LoadingSimulation: Story = {
  render: () => <LoadingSimulationTemplate />,
};

// Filter list example
const FilterListTemplate = () => {
  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];

  const [search, setSearch] = useState("");
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-sm space-y-4">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Filter fruits..."
        debounceMs={0}
      />
      <ul className="space-y-1">
        {filteredItems.map((item) => (
          <li
            key={item}
            className="p-2 bg-muted rounded text-sm"
          >
            {item}
          </li>
        ))}
        {filteredItems.length === 0 && (
          <li className="p-2 text-sm text-muted-foreground">No results found</li>
        )}
      </ul>
    </div>
  );
};

export const FilterListExample: Story = {
  render: () => <FilterListTemplate />,
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Empty</p>
        <SearchInput
          value=""
          onChange={() => {}}
          placeholder="Search..."
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">With value</p>
        <SearchInput
          value="search term"
          onChange={() => {}}
          placeholder="Search..."
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Loading</p>
        <SearchInput
          value="loading"
          onChange={() => {}}
          loading
          placeholder="Search..."
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Disabled</p>
        <SearchInput
          value="disabled"
          onChange={() => {}}
          disabled
          placeholder="Search..."
        />
      </div>
    </div>
  ),
};
