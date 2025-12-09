import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { POPULAR_SERVICES, type PopularService, en } from '@klard-apps/commons';

/**
 * ServiceGrid component for selecting popular services during onboarding.
 *
 * Features:
 * - Search/filter functionality
 * - Grid layout (2 rows x 4 cols = 8 services)
 * - Haptic feedback on selection
 * - Selected state styling
 * - Glassmorphism design with Klard color scheme
 */

export interface ServiceGridProps {
  onSelect: (service: PopularService) => void;
  selectedServiceId?: string;
}

export function ServiceGrid({ onSelect, selectedServiceId }: ServiceGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on search query and limit to 8 for mobile
  const filteredServices = POPULAR_SERVICES.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const handleSelect = (service: PopularService) => {
    Haptics.selectionAsync();
    onSelect(service);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={en.onboarding.addSubscription.searchPlaceholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.grid}>
        {filteredServices.map(service => (
          <ServiceChip
            key={service.id}
            service={service}
            isSelected={selectedServiceId === service.id}
            onPress={() => handleSelect(service)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * ServiceChip component - Individual service button in the grid.
 * Separated for Single Responsibility Principle.
 */
interface ServiceChipProps {
  service: PopularService;
  isSelected: boolean;
  onPress: () => void;
}

function ServiceChip({ service, isSelected, onPress }: ServiceChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        isSelected && styles.chipSelected,
        pressed && styles.chipPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Select ${service.name}`}
      accessibilityState={{ selected: isSelected }}
    >
      <View style={[styles.colorDot, { backgroundColor: service.color }]} />
      <Text style={styles.chipText} numberOfLines={2}>
        {service.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchInput: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 12,
    padding: 16,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 12,
  },
  chip: {
    width: '23%', // ~4 per row with gaps
    minHeight: 44,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  chipSelected: {
    backgroundColor: '#15B5B0',
    borderColor: '#15B5B0',
  },
  chipPressed: {
    opacity: 0.7,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  chipText: {
    color: '#F8FAFC',
    fontSize: 12,
    textAlign: 'center',
  },
});
