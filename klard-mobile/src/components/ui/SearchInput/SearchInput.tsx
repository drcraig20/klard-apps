import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  useColorScheme,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  containerStyles,
  inputStyles,
  getIconColor,
  getPlaceholderColor,
  layoutStyles,
} from './search-input.styles';

export interface SearchInputProps extends Omit<TextInputProps, 'onChangeText'> {
  /** Current search value (controlled) */
  value: string;
  /** Called immediately when input changes */
  onChangeText: (value: string) => void;
  /** Called after debounce delay with search term */
  onSearch?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Show loading indicator instead of clear button */
  loading?: boolean;
  /** Debounce delay in milliseconds (default: 300) */
  debounceMs?: number;
  /** Container style override */
  containerStyle?: StyleProp<ViewStyle>;
}

export function SearchInput({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  loading = false,
  debounceMs = 300,
  editable = true,
  containerStyle,
  ...props
}: SearchInputProps) {
  const isDark = useColorScheme() === 'dark';
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const iconColor = getIconColor(isDark);
  const placeholderColor = getPlaceholderColor(isDark);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const debouncedSearch = useCallback(
    (searchValue: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        onSearch?.(searchValue);
      }, debounceMs);
    },
    [onSearch, debounceMs]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText(text);
      debouncedSearch(text);
    },
    [onChangeText, debouncedSearch]
  );

  const handleClear = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onChangeText('');
    onSearch?.('');
  }, [onChangeText, onSearch]);

  const handleSubmitEditing = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSearch?.(value);
  }, [onSearch, value]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const showClearButton = !loading && value.length > 0;
  const disabled = !editable;

  return (
    <View
      testID="search-input-container"
      style={[
        ...containerStyles(isDark, {
          focused: isFocused ? 'true' : undefined,
          disabled: disabled ? 'true' : undefined,
        }),
        containerStyle,
      ]}
    >
      {/* Search icon */}
      <View style={layoutStyles.iconContainer} testID="search-icon">
        <Ionicons name="search" size={20} color={iconColor} />
      </View>

      {/* TextInput */}
      <TextInput
        testID="search-input"
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        editable={editable}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        style={inputStyles(isDark, {
          withAction: loading || showClearButton ? 'true' : undefined,
          disabled: disabled ? 'true' : undefined,
        })}
        {...props}
      />

      {/* Loading indicator */}
      {loading && (
        <View style={layoutStyles.actionContainer} testID="loading-indicator">
          <ActivityIndicator size="small" color={iconColor} />
        </View>
      )}

      {/* Clear button */}
      {showClearButton && (
        <Pressable
          onPress={handleClear}
          disabled={disabled}
          style={layoutStyles.actionContainer}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <Ionicons name="close-circle" size={20} color={iconColor} />
        </Pressable>
      )}
    </View>
  );
}
