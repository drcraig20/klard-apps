/**
 * Service Filtering Utilities
 * Shared service search and filtering functions
 *
 * SRP: Single responsibility - filter service lists
 * OCP: Configurable via options parameter
 */

import type { PopularService } from '../types/subscription';

interface FilterServicesOptions {
  /** Maximum number of results to return */
  limit?: number;
}

/**
 * Filters popular services by search query
 *
 * @param services - Array of services to filter
 * @param searchQuery - Search string to match against service names
 * @param options - Optional configuration (limit)
 * @returns Filtered array of services
 */
export function filterServices(
  services: PopularService[],
  searchQuery: string,
  options?: FilterServicesOptions
): PopularService[] {
  const query = searchQuery.trim();

  // If no query, return all (optionally limited)
  if (!query) {
    return options?.limit ? services.slice(0, options.limit) : services;
  }

  // Filter by name match
  const normalizedQuery = query.toLowerCase();
  const filtered = services.filter((service) =>
    service.name.toLowerCase().includes(normalizedQuery)
  );

  // Apply limit if specified
  return options?.limit ? filtered.slice(0, options.limit) : filtered;
}
