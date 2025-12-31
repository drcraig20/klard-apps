import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { InputField } from '@/components/ui/InputField';
import { mockLightColors } from '@/__tests__/__mocks__';

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, ...props }: { name: string }) => {
    const { Text } = require('react-native');
    return <Text {...props}>{name}</Text>;
  },
}));

// Mock useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: () => ({ ...mockLightColors, isDark: false }),
}));

describe('InputField', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with label', () => {
      const { getByText } = render(
        <InputField label="Email" onChangeText={mockOnChangeText} />
      );

      expect(getByText('Email')).toBeTruthy();
    });

    it('should render with placeholder', () => {
      const { getByPlaceholderText } = render(
        <InputField placeholder="Enter email" onChangeText={mockOnChangeText} />
      );

      expect(getByPlaceholderText('Enter email')).toBeTruthy();
    });

    it('should render without label when not provided', () => {
      const { getByPlaceholderText } = render(
        <InputField placeholder="No label" onChangeText={mockOnChangeText} />
      );

      expect(getByPlaceholderText('No label')).toBeTruthy();
    });

    it('should render the input field', () => {
      const { getByTestId } = render(
        <InputField label="Test" onChangeText={mockOnChangeText} />
      );

      expect(getByTestId('input-field')).toBeTruthy();
    });
  });

  describe('Input Types', () => {
    it('should use default keyboard type for text', () => {
      const { getByTestId } = render(
        <InputField type="text" label="Text" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.keyboardType).toBe('default');
    });

    it('should use email-address keyboard type for email', () => {
      const { getByTestId } = render(
        <InputField type="email" label="Email" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.keyboardType).toBe('email-address');
    });

    it('should use numeric keyboard type for number', () => {
      const { getByTestId } = render(
        <InputField type="number" label="Number" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.keyboardType).toBe('numeric');
    });

    it('should use decimal-pad keyboard type for currency', () => {
      const { getByTestId } = render(
        <InputField type="currency" label="Amount" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.keyboardType).toBe('decimal-pad');
    });

    it('should use phone-pad keyboard type for tel', () => {
      const { getByTestId } = render(
        <InputField type="tel" label="Phone" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.keyboardType).toBe('phone-pad');
    });
  });

  describe('Auto Capitalize', () => {
    it('should disable auto capitalize for email type', () => {
      const { getByTestId } = render(
        <InputField type="email" label="Email" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.autoCapitalize).toBe('none');
    });

    it('should disable auto capitalize for password type', () => {
      const { getByTestId } = render(
        <InputField type="password" label="Password" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.autoCapitalize).toBe('none');
    });

    it('should disable auto capitalize for search type', () => {
      const { getByTestId } = render(
        <InputField type="search" label="Search" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.autoCapitalize).toBe('none');
    });

    it('should use sentences auto capitalize for text type', () => {
      const { getByTestId } = render(
        <InputField type="text" label="Text" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.autoCapitalize).toBe('sentences');
    });
  });

  describe('Password Type', () => {
    it('should hide password text by default', () => {
      const { getByTestId } = render(
        <InputField type="password" label="Password" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.secureTextEntry).toBe(true);
    });

    it('should show password toggle button', () => {
      const { getByLabelText } = render(
        <InputField type="password" label="Password" onChangeText={mockOnChangeText} />
      );

      expect(getByLabelText('Show password')).toBeTruthy();
    });

    it('should toggle password visibility when pressed', async () => {
      const { getByTestId, getByLabelText } = render(
        <InputField type="password" label="Password" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      const toggleButton = getByLabelText('Show password');

      expect(input.props.secureTextEntry).toBe(true);

      fireEvent.press(toggleButton);

      await waitFor(() => {
        expect(input.props.secureTextEntry).toBe(false);
      });
    });

    it('should toggle back to hidden when pressed again', async () => {
      const { getByTestId, getByLabelText } = render(
        <InputField type="password" label="Password" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      const toggleButton = getByLabelText('Show password');

      fireEvent.press(toggleButton);

      await waitFor(() => {
        expect(input.props.secureTextEntry).toBe(false);
      });

      fireEvent.press(getByLabelText('Hide password'));

      await waitFor(() => {
        expect(input.props.secureTextEntry).toBe(true);
      });
    });
  });

  describe('Search Type', () => {
    it('should show clear button when value is present', () => {
      const { getByLabelText } = render(
        <InputField
          type="search"
          label="Search"
          value="test"
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByLabelText('Clear search')).toBeTruthy();
    });

    it('should not show clear button when value is empty', () => {
      const { queryByLabelText } = render(
        <InputField
          type="search"
          label="Search"
          value=""
          onChangeText={mockOnChangeText}
        />
      );

      expect(queryByLabelText('Clear search')).toBeNull();
    });

    it('should call onChangeText with empty string when clear is pressed', () => {
      const { getByLabelText } = render(
        <InputField
          type="search"
          label="Search"
          value="test"
          onChangeText={mockOnChangeText}
        />
      );

      fireEvent.press(getByLabelText('Clear search'));

      expect(mockOnChangeText).toHaveBeenCalledWith('');
    });

    it('should call onClear when clear is pressed', () => {
      const mockOnClear = jest.fn();
      const { getByLabelText } = render(
        <InputField
          type="search"
          label="Search"
          value="test"
          onChangeText={mockOnChangeText}
          onClear={mockOnClear}
        />
      );

      fireEvent.press(getByLabelText('Clear search'));

      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('Required Indicator', () => {
    it('should show asterisk when required', () => {
      const { getByText } = render(
        <InputField label="Required Field" required onChangeText={mockOnChangeText} />
      );

      expect(getByText('*')).toBeTruthy();
    });

    it('should not show asterisk when not required', () => {
      const { queryByText } = render(
        <InputField label="Optional Field" onChangeText={mockOnChangeText} />
      );

      expect(queryByText('*')).toBeNull();
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      const { getByText } = render(
        <InputField
          label="Email"
          error="Invalid email"
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByText('Invalid email')).toBeTruthy();
    });

    it('should have alert accessibility role on error message', () => {
      const { getByRole } = render(
        <InputField
          label="Email"
          error="Invalid email"
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByRole('alert')).toBeTruthy();
    });
  });

  describe('Helper Text', () => {
    it('should display helper text', () => {
      const { getByText } = render(
        <InputField
          label="Password"
          helperText="Must be at least 8 characters"
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByText('Must be at least 8 characters')).toBeTruthy();
    });

    it('should hide helper text when error is present', () => {
      const { queryByText, getByText } = render(
        <InputField
          label="Password"
          helperText="Must be at least 8 characters"
          error="Password too short"
          onChangeText={mockOnChangeText}
        />
      );

      expect(queryByText('Must be at least 8 characters')).toBeNull();
      expect(getByText('Password too short')).toBeTruthy();
    });
  });

  describe('Icon Support', () => {
    it('should render left icon', () => {
      const icon = <Text testID="left-icon">L</Text>;
      const { getByTestId } = render(
        <InputField label="With Icon" leftIcon={icon} onChangeText={mockOnChangeText} />
      );

      expect(getByTestId('left-icon')).toBeTruthy();
    });

    it('should render right icon when no action button', () => {
      const icon = <Text testID="right-icon">R</Text>;
      const { getByTestId } = render(
        <InputField label="With Icon" rightIcon={icon} onChangeText={mockOnChangeText} />
      );

      expect(getByTestId('right-icon')).toBeTruthy();
    });

    it('should not render right icon when password type', () => {
      const icon = <Text testID="right-icon">R</Text>;
      const { queryByTestId, getByLabelText } = render(
        <InputField
          type="password"
          label="Password"
          rightIcon={icon}
          onChangeText={mockOnChangeText}
        />
      );

      expect(queryByTestId('right-icon')).toBeNull();
      expect(getByLabelText('Show password')).toBeTruthy();
    });

    it('should render both left and right icons', () => {
      const leftIcon = <Text testID="left-icon">L</Text>;
      const rightIcon = <Text testID="right-icon">R</Text>;
      const { getByTestId } = render(
        <InputField
          label="Both Icons"
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByTestId('left-icon')).toBeTruthy();
      expect(getByTestId('right-icon')).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when editable is false', () => {
      const { getByTestId } = render(
        <InputField label="Disabled" editable={false} onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.editable).toBe(false);
    });

    it('should disable password toggle when input is disabled', () => {
      const { getByLabelText } = render(
        <InputField
          type="password"
          label="Password"
          editable={false}
          onChangeText={mockOnChangeText}
        />
      );

      const toggleButton = getByLabelText('Show password');
      // Pressable uses accessibilityState for disabled state
      expect(toggleButton.props.accessibilityState?.disabled).toBe(true);
    });
  });

  describe('Value and Change Handling', () => {
    it('should display controlled value', () => {
      const { getByTestId } = render(
        <InputField
          label="Controlled"
          value="test value"
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByTestId('input-field');
      expect(input.props.value).toBe('test value');
    });

    it('should call onChangeText when value changes', () => {
      const { getByTestId } = render(
        <InputField label="Test" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      fireEvent.changeText(input, 'new value');

      expect(mockOnChangeText).toHaveBeenCalledWith('new value');
    });
  });

  describe('Focus Handling', () => {
    it('should call onFocus when input is focused', () => {
      const mockOnFocus = jest.fn();
      const { getByTestId } = render(
        <InputField
          label="Test"
          onChangeText={mockOnChangeText}
          onFocus={mockOnFocus}
        />
      );

      const input = getByTestId('input-field');
      fireEvent(input, 'focus');

      expect(mockOnFocus).toHaveBeenCalled();
    });

    it('should call onBlur when input loses focus', () => {
      const mockOnBlur = jest.fn();
      const { getByTestId } = render(
        <InputField
          label="Test"
          onChangeText={mockOnChangeText}
          onBlur={mockOnBlur}
        />
      );

      const input = getByTestId('input-field');
      fireEvent(input, 'blur');

      expect(mockOnBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessibilityLabel from label prop', () => {
      const { getByTestId } = render(
        <InputField label="Email Address" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.accessibilityLabel).toBe('Email Address');
    });

    it('should have accessibilityHint from helperText prop', () => {
      const { getByTestId } = render(
        <InputField
          label="Password"
          helperText="Must be 8+ chars"
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByTestId('input-field');
      expect(input.props.accessibilityHint).toBe('Must be 8+ chars');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined value', () => {
      const { getByTestId } = render(
        <InputField label="Test" value={undefined} onChangeText={mockOnChangeText} />
      );

      expect(getByTestId('input-field')).toBeTruthy();
    });

    it('should handle empty string value', () => {
      const { getByTestId } = render(
        <InputField label="Test" value="" onChangeText={mockOnChangeText} />
      );

      const input = getByTestId('input-field');
      expect(input.props.value).toBe('');
    });

    it('should pass through additional props', () => {
      const { getByTestId } = render(
        <InputField
          label="Test"
          maxLength={10}
          autoComplete="email"
          onChangeText={mockOnChangeText}
        />
      );

      const input = getByTestId('input-field');
      expect(input.props.maxLength).toBe(10);
      expect(input.props.autoComplete).toBe('email');
    });

    it('should apply custom containerStyle', () => {
      const customStyle = { marginTop: 20 };
      const { getByTestId } = render(
        <InputField
          label="Test"
          containerStyle={customStyle}
          onChangeText={mockOnChangeText}
        />
      );

      expect(getByTestId('input-field')).toBeTruthy();
    });
  });
});
