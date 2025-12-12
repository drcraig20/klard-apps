import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from './search-input.styles';

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
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        styles.container,
        isFocused && styles.containerFocused,
        disabled && styles.containerDisabled,
        containerStyle,
      ]}
    >
      {/* Search icon */}
      <View style={styles.iconContainer} testID="search-icon">
        <Ionicons name="search" size={20} color={colors.icon} />
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
        placeholderTextColor={colors.placeholder}
        editable={editable}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.input,
          (loading || showClearButton) && styles.inputWithAction,
          disabled && styles.inputDisabled,
        ]}
        {...props}
      />

      {/* Loading indicator */}
      {loading && (
        <View style={styles.actionContainer} testID="loading-indicator">
          <ActivityIndicator size="small" color={colors.icon} />
        </View>
      )}

      {/* Clear button */}
      {showClearButton && (
        <Pressable
          onPress={handleClear}
          disabled={disabled}
          style={styles.actionContainer}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <Ionicons name="close-circle" size={20} color={colors.icon} />
        </Pressable>
      )}
    </View>
  );
}
