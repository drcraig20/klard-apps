'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { POPULAR_SERVICES, en, type PopularService } from '@klard-apps/commons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ServiceGridProps {
  onSelect: (service: PopularService) => void;
  selectedServiceId?: string;
}

/**
 * ServiceGrid Component
 *
 * Displays a searchable grid of popular subscription services.
 * Features:
 * - Search filtering by service name
 * - Responsive layout (4 columns on desktop, 4 columns on mobile with limited items)
 * - Visual selection state with teal border/background
 * - Glassmorphism effects following Klard design system
 * - Color indicators for each service
 *
 * @param onSelect - Callback when a service is selected
 * @param selectedServiceId - ID of currently selected service
 */
export function ServiceGrid({ onSelect, selectedServiceId }: ServiceGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const isLargeScreen = useIsLargeScreen();

  // Filter services based on search query
  const filteredServices = getFilteredServices(searchQuery);

  // On mobile (< lg), limit to 8 services; desktop shows all
  const displayedServices = getDisplayedServices(filteredServices, isLargeScreen);

  return (
    <div className="space-y-4">
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <ServiceChipGrid
        services={displayedServices}
        selectedServiceId={selectedServiceId}
        onSelect={onSelect}
      />
    </div>
  );
}

/**
 * Hook to detect if screen is large (lg breakpoint: 1024px)
 * Returns true for large screens, false for mobile
 */
function useIsLargeScreen(): boolean {
  const [isLarge, setIsLarge] = useState(true); // Default to true for SSR

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === 'undefined') return;

    const checkScreenSize = () => {
      setIsLarge(window.innerWidth >= 1024); // lg breakpoint
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isLarge;
}

/**
 * Search Input Component
 * Single Responsibility: Handle search input UI
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={en.onboarding.addSubscription.searchPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}

/**
 * Service Chip Grid Component
 * Single Responsibility: Render grid of service chips
 */
interface ServiceChipGridProps {
  services: PopularService[];
  selectedServiceId?: string;
  onSelect: (service: PopularService) => void;
}

function ServiceChipGrid({
  services,
  selectedServiceId,
  onSelect,
}: ServiceChipGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceChip
          key={service.id}
          service={service}
          isSelected={selectedServiceId === service.id}
          onClick={() => onSelect(service)}
        />
      ))}
    </div>
  );
}

/**
 * Service Chip Component
 * Single Responsibility: Render individual service chip with selection state
 */
interface ServiceChipProps {
  service: PopularService;
  isSelected: boolean;
  onClick: () => void;
}

function ServiceChip({ service, isSelected, onClick }: ServiceChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Base styles - glassmorphism effect
        'group flex min-h-[44px] flex-col items-center justify-center gap-2 rounded-lg p-3 transition-all duration-200',
        'bg-card/60 backdrop-blur-sm',
        'border',
        // Hover state - teal border/glow
        'hover:border-primary hover:shadow-[0_0_12px_rgba(21,181,176,0.3)]',
        // Focus state for accessibility
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        // Selection state - teal background with white text
        isSelected
          ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_12px_rgba(21,181,176,0.3)]'
          : 'border-border text-foreground'
      )}
      aria-pressed={isSelected}
      aria-label={`Select ${service.name}`}
    >
      <span
        className="h-3 w-3 rounded-full shadow-sm"
        style={{ backgroundColor: service.color }}
        aria-hidden="true"
      />
      <span className="text-center text-xs font-medium leading-tight">
        {service.name}
      </span>
    </button>
  );
}

/**
 * Filter services by search query (case-insensitive)
 * Pure function for testability
 */
function getFilteredServices(searchQuery: string): PopularService[] {
  if (!searchQuery.trim()) {
    return POPULAR_SERVICES;
  }

  const normalizedQuery = searchQuery.toLowerCase().trim();
  return POPULAR_SERVICES.filter((service) =>
    service.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get displayed services with responsive limit
 * Desktop (lg+): Shows all services
 * Mobile (<lg): Shows max 8 services (2 rows x 4 cols)
 */
function getDisplayedServices(
  services: PopularService[],
  isLargeScreen: boolean
): PopularService[] {
  const mobileLimit = 8;
  return isLargeScreen ? services : services.slice(0, mobileLimit);
}
