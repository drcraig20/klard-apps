import { useState } from 'react';
import { View, TextInput, Pressable, Text, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { POPULAR_SERVICES, type PopularService, en } from '@klard-apps/commons';
import { useThemeColors } from '@/hooks/useThemeColors';
import {
  searchInputStyles,
  chipStyles,
  chipTextStyles,
  layoutStyles,
} from './service-grid.styles';

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

export function ServiceGrid({ onSelect, selectedServiceId }: Readonly<ServiceGridProps>) {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = useThemeColors();

  // Filter services based on search query and limit to 8 for mobile
  const filteredServices = POPULAR_SERVICES.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const handleSelect = (service: PopularService) => {
    Haptics.selectionAsync();
    onSelect(service);
  };

  return (
    <View style={layoutStyles.container}>
      <TextInput
        placeholder={en.onboarding.addSubscription.searchPlaceholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={searchInputStyles(isDark, {})}
        placeholderTextColor={colors.mutedForeground}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={layoutStyles.grid}>
        {filteredServices.map(service => (
          <ServiceChip
            key={service.id}
            service={service}
            isSelected={selectedServiceId === service.id}
            onPress={() => handleSelect(service)}
            isDark={isDark}
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
  isDark: boolean;
}

function ServiceChip({ service, isSelected, onPress, isDark }: Readonly<ServiceChipProps>) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        ...chipStyles(isDark, {
          selected: isSelected ? 'true' : undefined,
          pressed: pressed ? 'true' : undefined,
        }),
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Select ${service.name}`}
      accessibilityState={{ selected: isSelected }}
    >
      <View style={[layoutStyles.colorDot, { backgroundColor: service.color }]} />
      <Text
        style={chipTextStyles(isDark, { selected: isSelected ? 'true' : undefined })}
        numberOfLines={2}
      >
        {service.name}
      </Text>
    </Pressable>
  );
}
