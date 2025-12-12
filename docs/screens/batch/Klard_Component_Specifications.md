# Klard Component Specifications
## Reusable Component Library for MVP Screens (1-34)
### Verified Against shadcn/ui & Expo SDK 54

---

## Overview

This document defines the reusable component library for Klard's MVP. Components are organized using atomic design principles and specified for both platforms:

- **Web:** Next.js 16 + React 19 + shadcn/ui + Tailwind CSS 4.1
- **Mobile:** React Native + Expo SDK 54

### Component Organization

```
components/
├── ui/                    # Foundational UI primitives
├── forms/                 # Form-specific components
├── layout/                # Layout and navigation
├── feedback/              # Loading, errors, notifications
├── data-display/          # Cards, lists, tables
├── domain/                # Klard-specific business components
└── patterns/              # Composite patterns (modals, wizards)
```

---

# Part 1: Foundational UI Components

---

<!-- COMPONENT:START:1.1-button -->
<!-- DONE:1.1-button -->
## 1.1 Button

**Used In:** All screens

**Purpose:** Primary interactive element for actions.

### Variants

| Variant | Use Case |
|---------|----------|
| `primary` | Main actions (Save, Continue, Add) |
| `secondary` | Alternative actions |
| `outline` | Less prominent actions |
| `ghost` | Minimal emphasis (Cancel, Skip) |
| `destructive` | Dangerous actions (Delete) |
| `link` | Text-style button |

### Props

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
  onPress: () => void;
}
```

### Web Implementation

```tsx
// shadcn/ui Button - VERIFIED
import { Button } from "@/components/ui/button";

<Button 
  variant="default" // maps to primary
  size="default"
  className="bg-teal-600 hover:bg-teal-700"
>
  {children}
</Button>
```

**shadcn/ui base:** `Button`

**Klard Customizations:**
- Primary uses brand teal (#0D7C7A) with subtle glow on hover
- Loading state shows spinner replacing text
- Icon support with consistent spacing

### Mobile Implementation

```tsx
import { Pressable, Text, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';

const Button = ({ variant, size, loading, disabled, onPress, children }) => {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#0D7C7A'} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
      )}
    </Pressable>
  );
};
```

**Expo packages:** `expo-haptics`

**React Native:** `Pressable`, `Text`, `ActivityIndicator`
<!-- COMPONENT:END:1.1-button -->
<!-- DONE:1.1-button -->

---

<!-- COMPONENT:START:1.2-input -->
<!-- DONE:1.2-input -->
## 1.2 Input

**Used In:** Screens 1-4, 8, 13, 15, 31

**Purpose:** Text input for forms.

### Variants

| Variant | Use Case |
|---------|----------|
| `text` | General text input |
| `email` | Email with validation |
| `password` | Password with show/hide toggle |
| `search` | Search with icon and clear button |
| `currency` | Money input with formatting |
| `number` | Numeric input |

### Props

```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'search' | 'currency' | 'number';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  autoFocus?: boolean;
  maxLength?: number;
}
```

### Web Implementation

```tsx
// shadcn/ui Input + Label - VERIFIED
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormInput = ({ label, error, helperText, ...props }) => (
  <div className="space-y-2">
    {label && <Label>{label}</Label>}
    <Input 
      {...props}
      className={cn(
        "border-slate-300 focus:border-teal-500 focus:ring-teal-500",
        error && "border-red-500"
      )}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
    {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
  </div>
);
```

**shadcn/ui base:** `Input`, `Label`

### Mobile Implementation

```tsx
import { TextInput, View, Text } from 'react-native';

const Input = ({ 
  label, 
  error, 
  helperText, 
  type,
  value,
  onChange,
  ...props 
}) => {
  const keyboardType = {
    email: 'email-address',
    number: 'numeric',
    currency: 'decimal-pad',
    text: 'default',
    search: 'default',
  }[type];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        secureTextEntry={type === 'password'}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#94A3B8"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};
```

**React Native:** `TextInput`, `View`, `Text`
<!-- COMPONENT:END:1.2-input -->

---

<!-- COMPONENT:START:1.3-password-input -->
<!-- DONE:1.3-password-input -->
## 1.3 PasswordInput

**Used In:** Screens 1, 2, 31

**Purpose:** Password input with visibility toggle and strength indicator.

### Props

```typescript
interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showStrength?: boolean;
  strength?: 'weak' | 'medium' | 'strong';
  requirements?: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}
```

### Web Implementation

```tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ showStrength, strength, requirements, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={visible ? 'text' : 'password'}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
      
      {showStrength && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {['weak', 'medium', 'strong'].map((level, i) => (
              <div
                key={level}
                className={cn(
                  "h-1 flex-1 rounded",
                  getStrengthLevel(strength) > i ? getStrengthColor(strength) : "bg-slate-200"
                )}
              />
            ))}
          </div>
          {requirements && <PasswordRequirements requirements={requirements} />}
        </div>
      )}
    </div>
  );
};
```

### Mobile Implementation

```tsx
import { TextInput, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordInput = ({ showStrength, strength, requirements, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!visible}
          style={styles.input}
          {...props}
        />
        <Pressable 
          onPress={() => setVisible(!visible)}
          style={styles.toggleButton}
        >
          <Ionicons 
            name={visible ? "eye-off" : "eye"} 
            size={20} 
            color="#64748B" 
          />
        </Pressable>
      </View>
      
      {showStrength && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBars}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.strengthBar,
                  getStrengthLevel(strength) > i && styles[`strength${strength}`]
                ]}
              />
            ))}
          </View>
          {requirements && <PasswordRequirements requirements={requirements} />}
        </View>
      )}
    </View>
  );
};
```

**Expo packages:** `@expo/vector-icons`
<!-- COMPONENT:END:1.3-password-input -->

---

<!-- COMPONENT:START:1.4-checkbox -->
<!-- DONE:1.4-checkbox -->
## 1.4 Checkbox

**Used In:** Screens 17, 29, 31, 47

**Purpose:** Binary selection control.

### Props

```typescript
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}
```

### Web Implementation

```tsx
// shadcn/ui Checkbox - VERIFIED
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CheckboxField = ({ checked, onChange, label, description, disabled }) => (
  <div className="flex items-start space-x-3">
    <Checkbox
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      className="data-[state=checked]:bg-teal-600"
    />
    {(label || description) && (
      <div className="space-y-1">
        {label && <Label className="cursor-pointer">{label}</Label>}
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
    )}
  </div>
);
```

**shadcn/ui base:** `Checkbox`, `Label`

### Mobile Implementation

```tsx
// CORRECTED: Use expo-checkbox instead of custom implementation
import { Checkbox } from 'expo-checkbox';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

const CheckboxField = ({ checked, onChange, label, description, disabled }) => {
  const handleChange = async (value) => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(value);
  };

  return (
    <Pressable 
      onPress={() => handleChange(!checked)} 
      style={styles.container}
      disabled={disabled}
    >
      <Checkbox
        value={checked}
        onValueChange={handleChange}
        disabled={disabled}
        color={checked ? '#0D7C7A' : undefined}
        style={styles.checkbox}
      />
      {(label || description) && (
        <View style={styles.labelContainer}>
          {label && <Text style={[styles.label, disabled && styles.disabled]}>{label}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}
    </Pressable>
  );
};

// Alternative: Native Switch with checkbox variant (iOS only)
// import { Host, Switch } from '@expo/ui/swift-ui';
// <Host matchContents>
//   <Switch checked={checked} onValueChange={onChange} label={label} variant="checkbox" />
// </Host>
```

**Expo packages:** 
- `expo-checkbox`
- `expo-haptics`
- `@expo/ui/swift-ui` Switch with `variant="checkbox"` (iOS alternative)
<!-- COMPONENT:END:1.4-checkbox -->

---

<!-- COMPONENT:START:1.5-switch-toggle -->
<!-- DONE:1.5-switch-toggle -->
## 1.5 Switch/Toggle

**Used In:** Screens 6, 20, 22, 23, 31

**Purpose:** Boolean on/off control.

### Props

```typescript
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}
```

### Web Implementation

```tsx
// shadcn/ui Switch - VERIFIED
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SwitchField = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between">
    <div className="space-y-0.5">
      {label && <Label>{label}</Label>}
      {description && <p className="text-sm text-slate-500">{description}</p>}
    </div>
    <Switch
      checked={checked}
      onCheckedChange={onChange}
      className="data-[state=checked]:bg-teal-600"
    />
  </div>
);
```

**shadcn/ui base:** `Switch`

### Mobile Implementation

```tsx
// CORRECTED: Use native Expo UI Switch components
import { Platform, View, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

// iOS - Native SwiftUI Switch
import { Host, Switch as SwiftUISwitch } from '@expo/ui/swift-ui';

// Android - Native Jetpack Compose Switch  
import { Switch as JetpackSwitch } from '@expo/ui/jetpack-compose';

const Switch = ({ checked, onChange, label, description, disabled }) => {
  const handleChange = async (value) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(value);
  };

  // Platform-specific native implementation
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <Host matchContents>
          <SwiftUISwitch
            checked={checked}
            onValueChange={handleChange}
            disabled={disabled}
          />
        </Host>
      </View>
    );
  }

  // Android native implementation
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <JetpackSwitch
        value={checked}
        onValueChange={handleChange}
        disabled={disabled}
        color="#0D7C7A"
      />
    </View>
  );
};

// Fallback: React Native Switch (still valid)
import { Switch as RNSwitch } from 'react-native';
const FallbackSwitch = ({ checked, onChange, disabled }) => (
  <RNSwitch
    value={checked}
    onValueChange={onChange}
    disabled={disabled}
    trackColor={{ false: '#E2E8F0', true: '#0D7C7A' }}
    thumbColor="#fff"
    ios_backgroundColor="#E2E8F0"
  />
);
```

**Expo packages:**
- `@expo/ui/swift-ui` Switch (iOS)
- `@expo/ui/jetpack-compose` Switch (Android)
- `expo-haptics`

**React Native (fallback):** `Switch`
<!-- COMPONENT:END:1.5-switch-toggle -->

---

<!-- COMPONENT:START:1.6-select-dropdown -->
<!-- DONE:1.6-select-dropdown -->
## 1.6 Select / Dropdown

**Used In:** Screens 8, 11, 13, 20, 27, 29, 31

**Purpose:** Single selection from a list of options.

### Props

```typescript
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
  }>;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
}
```

### Web Implementation

```tsx
// shadcn/ui Select - VERIFIED
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectField = ({ value, onChange, options, placeholder, label, error }) => (
  <div className="space-y-2">
    {label && <Label>{label}</Label>}
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn(error && "border-red-500")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            <div className="flex items-center gap-2">
              {option.icon}
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);
```

**shadcn/ui base:** `Select`

### Mobile Implementation

```tsx
// CORRECTED: Use native Expo UI Picker components
import { Platform, View, Text } from 'react-native';

// iOS - Native SwiftUI Picker
import { Host, Picker as SwiftUIPicker } from '@expo/ui/swift-ui';

// Android - Native Jetpack Compose Picker
import { Picker as JetpackPicker } from '@expo/ui/jetpack-compose';

const Select = ({ value, onChange, options, placeholder, label, error }) => {
  const selectedIndex = options.findIndex(o => o.value === value);
  
  const handleSelect = ({ nativeEvent: { index } }) => {
    onChange(options[index].value);
  };

  // iOS - Native wheel picker
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <Host style={{ height: 150 }}>
          <SwiftUIPicker
            options={options.map(o => o.label)}
            selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}
            onOptionSelected={handleSelect}
            variant="wheel"
          />
        </Host>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }

  // Android - Native radio picker
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <JetpackPicker
        options={options.map(o => o.label)}
        selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}
        onOptionSelected={handleSelect}
        variant="radio"
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

// For bottom sheet picker (common pattern)
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetSelect = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.value === value);

  return (
    <>
      <Pressable onPress={() => setIsOpen(true)} style={styles.trigger}>
        <Text>{selectedOption?.label || 'Select...'}</Text>
        <Ionicons name="chevron-down" size={20} color="#64748B" />
      </Pressable>
      
      {/* Bottom sheet with native picker */}
    </>
  );
};
```

**Expo packages:**
- `@expo/ui/swift-ui` Picker (iOS) - wheel, segmented variants
- `@expo/ui/jetpack-compose` Picker (Android) - radio, segmented variants
- `@gorhom/bottom-sheet` (for bottom sheet pattern)
<!-- COMPONENT:END:1.6-select-dropdown -->

---

<!-- COMPONENT:START:1.7-badge-chip -->
<!-- DONE:1.7-badge-chip -->
## 1.7 Badge / Chip

**Used In:** Screens 10-12, 17, 18, 22, 24-26

**Purpose:** Display status, category, or metadata labels.

### Variants

| Variant | Use Case | Color |
|---------|----------|-------|
| `default` | Neutral information | Slate |
| `primary` | Brand/featured | Teal |
| `success` | Positive status (Active) | Green |
| `warning` | Caution status (Trial, Expiring) | Amber |
| `error` | Negative status (Blocked, Failed) | Red |
| `outline` | De-emphasized | Border only |

### Props

```typescript
interface BadgeProps {
  variant: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}
```

### Web Implementation

```tsx
// shadcn/ui Badge - VERIFIED
import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ variant, size = 'md', icon, removable, onRemove, children }) => {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-teal-100 text-teal-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    outline: 'border border-slate-300 text-slate-600 bg-transparent',
  };

  return (
    <Badge className={cn(
      variantStyles[variant],
      size === 'sm' && 'text-xs px-1.5 py-0.5'
    )}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {removable && (
        <button onClick={onRemove} className="ml-1 hover:opacity-70">
          <X size={12} />
        </button>
      )}
    </Badge>
  );
};
```

**shadcn/ui base:** `Badge`

### Mobile Implementation

```tsx
import { View, Text, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Android has native Chip component
import { Chip } from '@expo/ui/jetpack-compose';

const Badge = ({ variant, size = 'md', icon, removable, onRemove, children }) => {
  // Android - Use native Chip for enhanced functionality
  if (Platform.OS === 'android' && removable) {
    return (
      <Chip
        variant="input"
        label={children}
        onDismiss={onRemove}
      />
    );
  }

  // Cross-platform fallback
  return (
    <View style={[styles.badge, styles[variant], styles[size]]}>
      {icon}
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
      {removable && (
        <Pressable onPress={onRemove} style={styles.removeButton}>
          <Ionicons name="close" size={12} color={styles[`${variant}Text`].color} />
        </Pressable>
      )}
    </View>
  );
};
```

**Expo packages:**
- `@expo/ui/jetpack-compose` Chip (Android)
- `@expo/vector-icons`
<!-- COMPONENT:END:1.7-badge-chip -->

---

<!-- COMPONENT:START:1.8-avatar -->
<!-- DONE:1.8-avatar -->
## 1.8 Avatar

**Used In:** Screens 10, 31

**Purpose:** Display user or service images with fallback.

### Props

```typescript
interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string; // Initials or icon
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}
```

### Web Implementation

```tsx
// shadcn/ui Avatar - VERIFIED
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ src, alt, fallback, size, shape = 'circle' }) => {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  return (
    <Avatar className={cn(sizes[size], shape === 'square' && 'rounded-lg')}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-teal-100 text-teal-700">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
};
```

**shadcn/ui base:** `Avatar`

### Mobile Implementation

```tsx
// CORRECTED: Use expo-image instead of React Native Image
import { Image } from 'expo-image';
import { View, Text } from 'react-native';

const Avatar = ({ src, alt, fallback, size, shape = 'circle' }) => {
  const [error, setError] = useState(false);
  
  const sizes = {
    xs: 24, sm: 32, md: 40, lg: 48, xl: 64,
  };

  const dimension = sizes[size];
  const borderRadius = shape === 'circle' ? dimension / 2 : 8;

  // Blurhash placeholder for smooth loading
  const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

  return (
    <View style={[
      styles.container,
      { width: dimension, height: dimension, borderRadius },
    ]}>
      {src && !error ? (
        <Image
          source={src}
          style={{ width: dimension, height: dimension, borderRadius }}
          contentFit="cover"
          placeholder={{ blurhash }}
          transition={200}
          onError={() => setError(true)}
          accessibilityLabel={alt}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius }]}>
          <Text style={[styles.fallbackText, styles[`${size}Text`]]}>{fallback}</Text>
        </View>
      )}
    </View>
  );
};
```

**Expo packages:** `expo-image`

**Benefits of expo-image:**
- Advanced caching (memory + disk)
- Blurhash/Thumbhash placeholders
- Smooth transitions
- Better performance
- WebP support
<!-- COMPONENT:END:1.8-avatar -->

---

<!-- COMPONENT:START:1.9-progress-bar -->
<!-- DONE:1.9-progress-bar -->
## 1.9 ProgressBar

**Used In:** Screens 16, 18, 22, 27, 28, 39

**Purpose:** Display progress or percentage completion.

### Props

```typescript
interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}
```

### Web Implementation

```tsx
// shadcn/ui Progress - VERIFIED
import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ 
  value, 
  max = 100, 
  variant = 'default', 
  size = 'md',
  showLabel,
  label 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const variantColors = {
    default: 'bg-teal-600',
    success: 'bg-green-600',
    warning: 'bg-amber-500',
    error: 'bg-red-600',
  };

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="space-y-1">
      {(showLabel || label) && (
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">{label}</span>
          {showLabel && <span className="text-slate-500">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <Progress 
        value={percentage} 
        className={heights[size]}
        indicatorClassName={variantColors[variant]}
      />
    </div>
  );
};
```

**shadcn/ui base:** `Progress`

### Mobile Implementation

```tsx
import { View, Text, Animated } from 'react-native';

const ProgressBar = ({ value, max = 100, variant = 'default', size = 'md', showLabel, label }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View style={styles.container}>
      {(showLabel || label) && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {showLabel && <Text style={styles.percentage}>{percentage.toFixed(0)}%</Text>}
        </View>
      )}
      <View style={[styles.track, styles[`${size}Track`]]}>
        <Animated.View 
          style={[
            styles.fill,
            styles[variant],
            { width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            })}
          ]} 
        />
      </View>
    </View>
  );
};
```

**React Native:** `Animated`, `View`, `Text`
<!-- COMPONENT:END:1.9-progress-bar -->

---

<!-- COMPONENT:START:1.10-spinner-loading -->
<!-- DONE:1.10-spinner-loading -->
## 1.10 Spinner / Loading

**Used In:** All screens (loading states)

**Purpose:** Indicate loading or processing state.

### Props

```typescript
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
}
```

### Web Implementation

```tsx
import { Loader2 } from "lucide-react";

const Spinner = ({ size = 'md', color, label }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex items-center gap-2">
      <Loader2 
        className={cn(sizes[size], 'animate-spin')} 
        style={{ color: color || '#0D7C7A' }}
      />
      {label && <span className="text-sm text-slate-600">{label}</span>}
    </div>
  );
};
```

### Mobile Implementation

```tsx
import { ActivityIndicator, View, Text } from 'react-native';

const Spinner = ({ size = 'md', color = '#0D7C7A', label }) => {
  const sizes = { sm: 'small', md: 'small', lg: 'large' };

  return (
    <View style={styles.container}>
      <ActivityIndicator size={sizes[size]} color={color} />
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
};
```

**React Native:** `ActivityIndicator`
<!-- COMPONENT:END:1.10-spinner-loading -->

---

<!-- COMPONENT:START:1.11-slider -->
<!-- DONE:1.11-slider -->
## 1.11 Slider

**Used In:** Screens 20, 23, 39

**Purpose:** Select a value from a range.

### Props

```typescript
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
}
```

### Web Implementation

```tsx
// shadcn/ui Slider - VERIFIED
import { Slider } from "@/components/ui/slider";

const SliderField = ({ value, onChange, min = 0, max = 100, step = 1, label, showValue }) => (
  <div className="space-y-2">
    {(label || showValue) && (
      <div className="flex justify-between text-sm">
        {label && <span className="text-slate-600">{label}</span>}
        {showValue && <span className="text-slate-500">{value}</span>}
      </div>
    )}
    <Slider
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      min={min}
      max={max}
      step={step}
      className="w-full"
    />
  </div>
);
```

**shadcn/ui base:** `Slider`

### Mobile Implementation

```tsx
// NEW: Use native Expo UI Slider for iOS
import { Platform, View, Text } from 'react-native';

// iOS - Native SwiftUI Slider
import { Host, Slider as SwiftUISlider } from '@expo/ui/swift-ui';

// Cross-platform fallback
import Slider from '@react-native-community/slider';

const SliderField = ({ value, onChange, min = 0, max = 100, label, showValue }) => {
  // iOS - Native SwiftUI Slider
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        {(label || showValue) && (
          <View style={styles.labelRow}>
            {label && <Text style={styles.label}>{label}</Text>}
            {showValue && <Text style={styles.value}>{value}</Text>}
          </View>
        )}
        <Host style={{ minHeight: 44 }}>
          <SwiftUISlider
            value={value}
            onValueChange={onChange}
            minimumValue={min}
            maximumValue={max}
          />
        </Host>
      </View>
    );
  }

  // Android/Cross-platform
  return (
    <View style={styles.container}>
      {(label || showValue) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.value}>{value}</Text>}
        </View>
      )}
      <Slider
        value={value}
        onValueChange={onChange}
        minimumValue={min}
        maximumValue={max}
        minimumTrackTintColor="#0D7C7A"
        maximumTrackTintColor="#E2E8F0"
        thumbTintColor="#0D7C7A"
      />
    </View>
  );
};
```

**Expo packages:**
- `@expo/ui/swift-ui` Slider (iOS)
- `@react-native-community/slider` (Android/fallback)
<!-- COMPONENT:END:1.11-slider -->

---

# Part 2: Form Components

---

<!-- COMPONENT:START:2.1-form-field -->
<!-- DONE:2.1-form-field -->
## 2.1 FormField

**Used In:** All form screens

**Purpose:** Wrapper component for consistent form field layout.

### Props

```typescript
interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
}
```

### Web Implementation

```tsx
import { Label } from "@/components/ui/label";

const FormField = ({ label, required, error, helperText, children }) => (
  <div className="space-y-2">
    {label && (
      <Label className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
    )}
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
    {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
  </div>
);
```

### Mobile Implementation

```tsx
const FormField = ({ label, required, error, helperText, children }) => (
  <View style={styles.container}>
    {label && (
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
    )}
    {children}
    {error && <Text style={styles.error}>{error}</Text>}
    {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
  </View>
);
```
<!-- COMPONENT:END:2.1-form-field -->

---

<!-- COMPONENT:START:2.2-currency-input -->
<!-- DONE:2.2-currency-input -->
## 2.2 CurrencyInput

**Used In:** Screens 8, 13, 20, 23

**Purpose:** Formatted currency input with symbol.

### Props

```typescript
interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string; // 'USD', 'EUR', etc.
  label?: string;
  error?: string;
  min?: number;
  max?: number;
}
```

### Web Implementation

```tsx
import { Input } from "@/components/ui/input";

const CurrencyInput = ({ value, onChange, currency = 'USD', label, error }) => {
  const symbol = currency === 'USD' ? '$' : currency;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
    onChange(numValue);
  };

  return (
    <FormField label={label} error={error}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {symbol}
        </span>
        <Input
          type="text"
          inputMode="decimal"
          value={value.toFixed(2)}
          onChange={handleChange}
          className="pl-7"
        />
      </div>
    </FormField>
  );
};
```

### Mobile Implementation

```tsx
import { TextInput, View, Text } from 'react-native';

const CurrencyInput = ({ value, onChange, currency = 'USD', label, error }) => {
  const symbol = currency === 'USD' ? '$' : currency;

  return (
    <FormField label={label} error={error}>
      <View style={styles.inputWrapper}>
        <Text style={styles.symbol}>{symbol}</Text>
        <TextInput
          value={value.toFixed(2)}
          onChangeText={(text) => {
            const num = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
            onChange(num);
          }}
          keyboardType="decimal-pad"
          style={styles.input}
        />
      </View>
    </FormField>
  );
};
```
<!-- COMPONENT:END:2.2-currency-input -->

---

<!-- COMPONENT:START:2.3-date-picker -->
<!-- DONE:2.3-date-picker -->
## 2.3 DatePicker

**Used In:** Screens 8, 13, 14, 20, 27, 29

**Purpose:** Date selection input.

### Props

```typescript
interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  mode?: 'date' | 'time' | 'datetime';
}
```

### Web Implementation

```tsx
// shadcn/ui Calendar + Popover - VERIFIED
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const DatePicker = ({ value, onChange, label, error, minDate, maxDate, placeholder }) => (
  <FormField label={label} error={error}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-slate-500"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : placeholder || "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => 
            (minDate && date < minDate) || (maxDate && date > maxDate)
          }
        />
      </PopoverContent>
    </Popover>
  </FormField>
);
```

**shadcn/ui base:** `Calendar`, `Popover`

### Mobile Implementation

```tsx
// CORRECTED: Use native Expo UI DateTimePicker
import { Platform, Pressable, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// iOS - Native SwiftUI DateTimePicker
import { DateTimePicker as SwiftUIDateTimePicker, Host } from '@expo/ui/swift-ui';

// Android - Native Jetpack Compose DateTimePicker
import { DateTimePicker as JetpackDateTimePicker } from '@expo/ui/jetpack-compose';

const DatePicker = ({ value, onChange, label, error, minDate, maxDate, placeholder, mode = 'date' }) => {
  const [showPicker, setShowPicker] = useState(false);

  const displayedComponents = mode === 'date' ? 'date' : 
                              mode === 'time' ? 'hourAndMinute' : 'date';

  // iOS - Native SwiftUI DateTimePicker
  if (Platform.OS === 'ios') {
    return (
      <FormField label={label} error={error}>
        <Pressable onPress={() => setShowPicker(true)} style={styles.trigger}>
          <Ionicons name="calendar-outline" size={20} color="#64748B" />
          <Text style={[styles.value, !value && styles.placeholder]}>
            {value ? value.toLocaleDateString() : placeholder || 'Select date'}
          </Text>
        </Pressable>

        {showPicker && (
          <View style={styles.pickerContainer}>
            <Host matchContents>
              <SwiftUIDateTimePicker
                onDateSelected={(dateString) => {
                  onChange(new Date(dateString));
                  setShowPicker(false);
                }}
                displayedComponents={displayedComponents}
                initialDate={(value || new Date()).toISOString()}
                variant="wheel"
              />
            </Host>
          </View>
        )}
      </FormField>
    );
  }

  // Android - Native Jetpack Compose DateTimePicker
  return (
    <FormField label={label} error={error}>
      <Pressable onPress={() => setShowPicker(true)} style={styles.trigger}>
        <Ionicons name="calendar-outline" size={20} color="#64748B" />
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value ? value.toLocaleDateString() : placeholder || 'Select date'}
        </Text>
      </Pressable>

      {showPicker && (
        <JetpackDateTimePicker
          onDateSelected={(dateString) => {
            onChange(new Date(dateString));
            setShowPicker(false);
          }}
          displayedComponents={displayedComponents}
          initialDate={(value || new Date()).toISOString()}
          variant="picker"
        />
      )}
    </FormField>
  );
};

// Fallback: @react-native-community/datetimepicker (still works)
// import DateTimePicker from '@react-native-community/datetimepicker';
```

**Expo packages:**
- `@expo/ui/swift-ui` DateTimePicker (iOS)
- `@expo/ui/jetpack-compose` DateTimePicker (Android)
- `@react-native-community/datetimepicker` (fallback)
<!-- COMPONENT:END:2.3-date-picker -->

---

<!-- COMPONENT:START:2.4-search-input -->
<!-- DONE:2.4-search-input -->
## 2.4 SearchInput

**Used In:** Screens 8, 11, 13, 30, 33

**Purpose:** Search input with icon and clear button.

### Props

```typescript
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  debounceMs?: number;
}
```

### Web Implementation

```tsx
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";

const SearchInput = ({ value, onChange, onSearch, placeholder, loading, debounceMs = 300 }) => {
  const debouncedSearch = useDebouncedCallback((v) => onSearch?.(v), debounceMs);

  const handleChange = (e) => {
    const v = e.target.value;
    onChange(v);
    debouncedSearch(v);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder || "Search..."}
        className="pl-10 pr-10"
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-slate-400" />
      )}
      {!loading && value && (
        <button
          onClick={() => { onChange(''); onSearch?.(''); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
```

### Mobile Implementation

```tsx
import { TextInput, View, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ value, onChange, onSearch, placeholder, loading }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#94A3B8" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={(v) => {
          onChange(v);
          onSearch?.(v);
        }}
        placeholder={placeholder || "Search..."}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={() => onSearch?.(value)}
      />
      {loading && <ActivityIndicator size="small" color="#94A3B8" />}
      {!loading && value && (
        <Pressable onPress={() => { onChange(''); onSearch?.(''); }}>
          <Ionicons name="close-circle" size={20} color="#94A3B8" />
        </Pressable>
      )}
    </View>
  );
};
```
<!-- COMPONENT:END:2.4-search-input -->

---

<!-- COMPONENT:START:2.5-segmented-control -->
<!-- DONE:2.5-segmented-control -->
## 2.5 SegmentedControl

**Used In:** Screens 6, 11, 14, 19, 27

**Purpose:** Mutually exclusive option selection.

### Props

```typescript
interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon?: ReactNode;
  }>;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}
```

### Web Implementation

```tsx
// shadcn/ui Tabs - VERIFIED
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SegmentedControl = ({ value, onChange, options, size = 'md', fullWidth }) => (
  <Tabs value={value} onValueChange={onChange} className={fullWidth ? 'w-full' : ''}>
    <TabsList className={cn(
      "bg-slate-100",
      fullWidth && "w-full",
      size === 'sm' && "h-8"
    )}>
      {options.map((option) => (
        <TabsTrigger
          key={option.value}
          value={option.value}
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:text-teal-700",
            fullWidth && "flex-1"
          )}
        >
          {option.icon}
          {option.label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);
```

**shadcn/ui base:** `Tabs`

### Mobile Implementation

```tsx
// CORRECTED: Use native Expo UI Picker with segmented variant
import { Platform, View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

// iOS - Native SwiftUI Picker (segmented)
import { Host, Picker as SwiftUIPicker } from '@expo/ui/swift-ui';

// Android - Native Jetpack Compose Picker (segmented)
import { Picker as JetpackPicker } from '@expo/ui/jetpack-compose';

const SegmentedControl = ({ value, onChange, options }) => {
  const selectedIndex = options.findIndex(opt => opt.value === value);
  
  const handleSelect = async ({ nativeEvent: { index } }) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(options[index].value);
  };

  // iOS - Native segmented control
  if (Platform.OS === 'ios') {
    return (
      <Host matchContents>
        <SwiftUIPicker
          options={options.map(opt => opt.label)}
          selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}
          onOptionSelected={handleSelect}
          variant="segmented"
        />
      </Host>
    );
  }

  // Android - Native segmented control
  return (
    <JetpackPicker
      options={options.map(opt => opt.label)}
      selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}
      onOptionSelected={handleSelect}
      variant="segmented"
    />
  );
};

// Fallback: Custom implementation
const FallbackSegmentedControl = ({ value, onChange, options }) => {
  const handlePress = async (optionValue) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(optionValue);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable
          key={option.value}
          onPress={() => handlePress(option.value)}
          style={[
            styles.segment,
            value === option.value && styles.activeSegment,
            index === 0 && styles.firstSegment,
            index === options.length - 1 && styles.lastSegment,
          ]}
        >
          {option.icon}
          <Text style={[
            styles.label,
            value === option.value && styles.activeLabel
          ]}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
```

**Expo packages:**
- `@expo/ui/swift-ui` Picker with `variant="segmented"` (iOS)
- `@expo/ui/jetpack-compose` Picker with `variant="segmented"` (Android)
- `expo-haptics`
<!-- COMPONENT:END:2.5-segmented-control -->

---

# Part 3: Layout Components

---

<!-- COMPONENT:START:3.1-card -->
<!-- DONE:3.1-card -->
## 3.1 Card

**Used In:** All screens

**Purpose:** Container for grouped content.

### Variants

| Variant | Use Case |
|---------|----------|
| `default` | Standard card with border |
| `elevated` | Card with shadow |
| `ghost` | Minimal styling |
| `interactive` | Hoverable/pressable card |

### Props

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'ghost' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  onPress?: () => void;
}
```

### Web Implementation

```tsx
// shadcn/ui Card - VERIFIED
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const StyledCard = ({ variant = 'default', padding = 'md', children, onPress }) => {
  const variantStyles = {
    default: 'border border-slate-200',
    elevated: 'shadow-md border-0',
    ghost: 'border-0 bg-transparent',
    interactive: 'border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer',
  };

  const Component = onPress ? 'button' : 'div';

  return (
    <Card 
      as={Component}
      onClick={onPress}
      className={cn(variantStyles[variant])}
    >
      <CardContent className={cn(
        padding === 'none' && 'p-0',
        padding === 'sm' && 'p-3',
        padding === 'md' && 'p-4',
        padding === 'lg' && 'p-6',
      )}>
        {children}
      </CardContent>
    </Card>
  );
};
```

**shadcn/ui base:** `Card`

### Mobile Implementation

```tsx
import { View, Pressable } from 'react-native';

const Card = ({ variant = 'default', padding = 'md', children, onPress }) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        styles[variant],
        styles[`padding${padding}`],
        pressed && styles.pressed,
      ]}
    >
      {children}
    </Container>
  );
};
```
<!-- COMPONENT:END:3.1-card -->

---

<!-- COMPONENT:START:3.2-modal-dialog -->
<!-- DONE:3.2-modal-dialog -->
## 3.2 Modal / Dialog

**Used In:** Screens 9, 13, 19-21, 23, 29

**Purpose:** Overlay dialog for focused interactions.

### Props

```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlay?: boolean;
}
```

### Web Implementation

```tsx
// shadcn/ui Dialog - VERIFIED
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Modal = ({ 
  open, 
  onClose, 
  title, 
  description, 
  size = 'md', 
  children, 
  footer,
  closeOnOverlay = true 
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className={sizes[size]}
        onInteractOutside={(e) => !closeOnOverlay && e.preventDefault()}
      >
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
```

**shadcn/ui base:** `Dialog`

### Mobile Implementation

```tsx
import { Modal as RNModal, View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Modal = ({ open, onClose, title, description, children, footer }) => {
  const insets = useSafeAreaInsets();

  return (
    <RNModal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Pressable style={styles.overlay} onPress={onClose} />
        <View style={[styles.content, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#64748B" />
            </Pressable>
          </View>
          
          {description && <Text style={styles.description}>{description}</Text>}
          
          <View style={styles.body}>{children}</View>
          
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};
```

**Expo packages:** `react-native-safe-area-context`
<!-- COMPONENT:END:3.2-modal-dialog -->

---

<!-- COMPONENT:START:3.3-bottom-sheet -->
<!-- DONE:3.3-bottom-sheet -->
## 3.3 BottomSheet (Mobile Only)

**Used In:** Mobile versions of Screens 11, 13, 17, 22, 24

**Purpose:** Slide-up panel for mobile interactions.

### Props

```typescript
interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  snapPoints?: string[]; // e.g., ['25%', '50%', '90%']
  children: ReactNode;
  enableDrag?: boolean;
}
```

### Mobile Implementation

```tsx
// CORRECTED: Added native iOS option
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// iOS - Native SwiftUI BottomSheet 
import { BottomSheet as SwiftUIBottomSheet } from '@expo/ui/swift-ui';

// Cross-platform - @gorhom/bottom-sheet
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

const KlardBottomSheet = ({ 
  open, 
  onClose, 
  snapPoints = ['50%'], 
  children, 
  enableDrag = true 
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (open) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [open]);

  // iOS - Can use native SwiftUI BottomSheet
  if (Platform.OS === 'ios') {
    return (
      <SwiftUIBottomSheet
        isOpen={open}
        onDismiss={onClose}
      >
        <View style={{ paddingBottom: insets.bottom }}>
          {children}
        </View>
      </SwiftUIBottomSheet>
    );
  }

  // Cross-platform implementation
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={enableDrag}
      onClose={onClose}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={{ paddingBottom: insets.bottom }}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};
```

**Expo packages:**
- `@expo/ui/swift-ui` BottomSheet (iOS)
- `@gorhom/bottom-sheet` (cross-platform)
<!-- COMPONENT:END:3.3-bottom-sheet -->

---

<!-- COMPONENT:START:3.4-tabs -->
<!-- DONE:3.4-tabs -->
## 3.4 Tabs

**Used In:** Screens 11, 18, 24, 48

**Purpose:** Tab-based content organization.

### Props

```typescript
interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  tabs: Array<{
    value: string;
    label: string;
    badge?: number;
    icon?: ReactNode;
  }>;
  children: ReactNode;
}
```

### Web Implementation

```tsx
// shadcn/ui Tabs - VERIFIED
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabContainer = ({ value, onChange, tabs, children }) => (
  <Tabs value={value} onValueChange={onChange}>
    <TabsList>
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value} className="gap-2">
          {tab.icon}
          {tab.label}
          {tab.badge !== undefined && (
            <Badge variant="secondary" className="ml-1">
              {tab.badge}
            </Badge>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
    {children}
  </Tabs>
);
```

**shadcn/ui base:** `Tabs`

### Mobile Implementation

```tsx
import { View, ScrollView, Pressable, Text } from 'react-native';

const TabBar = ({ value, onChange, tabs }) => (
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={styles.tabBar}
  >
    {tabs.map((tab) => (
      <Pressable
        key={tab.value}
        onPress={() => onChange(tab.value)}
        style={[styles.tab, value === tab.value && styles.activeTab]}
      >
        {tab.icon}
        <Text style={[styles.tabLabel, value === tab.value && styles.activeTabLabel]}>
          {tab.label}
        </Text>
        {tab.badge !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tab.badge}</Text>
          </View>
        )}
      </Pressable>
    ))}
  </ScrollView>
);
```
<!-- COMPONENT:END:3.4-tabs -->

---

<!-- COMPONENT:START:3.5-sidebar -->
<!-- DONE:3.5-sidebar -->
## 3.5 Sidebar (Web Only)

**Used In:** Web versions of Screens 10-34

**Purpose:** Primary navigation for web application.

### Web Implementation

```tsx
// shadcn/ui Sidebar - VERIFIED
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ items, activeItem }) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={activeItem === item.id}
                  >
                    <a href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && <Badge>{item.badge}</Badge>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
```

**shadcn/ui base:** `Sidebar`
<!-- COMPONENT:END:3.5-sidebar -->

---

<!-- COMPONENT:START:3.6-tab-bar -->
<!-- DONE:3.6-tab-bar -->
## 3.6 TabBar (Mobile Only)

**Used In:** Mobile versions of Screens 10-34

**Purpose:** Bottom navigation for mobile app.

### Props

```typescript
interface TabBarProps {
  tabs: Array<{
    name: string;
    icon: string;
    badge?: number;
    isCenter?: boolean;
  }>;
  activeTab: string;
  onTabPress: (name: string) => void;
}
```

### Mobile Implementation

```tsx
// CORRECTED: Use expo-router native tabs
import { NativeTabs, Icon, Label, Badge, VectorIcon } from 'expo-router/unstable-native-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Native tab bar with expo-router (PREFERRED)
export default function TabLayout() {
  return (
    <NativeTabs
      backgroundColor="#FFFFFF"
      iconColor={{ default: '#64748B', selected: '#0D7C7A' }}
      labelStyle={{ 
        default: { fontSize: 12, color: '#64748B' }, 
        selected: { fontSize: 12, fontWeight: '600', color: '#0D7C7A' } 
      }}
    >
      <NativeTabs.Trigger name="dashboard">
        <Icon src={<VectorIcon family={MaterialCommunityIcons} name="view-dashboard" />} />
        <Label>Dashboard</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="subscriptions">
        <Icon src={<VectorIcon family={MaterialCommunityIcons} name="credit-card-multiple" />} />
        <Label>Subscriptions</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="cards">
        <Icon src={<VectorIcon family={MaterialCommunityIcons} name="wallet" />} />
        <Label>Cards</Label>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="alerts">
        <Icon src={<VectorIcon family={MaterialCommunityIcons} name="bell" />} />
        <Label>Alerts</Label>
        <Badge>3</Badge>
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="settings">
        <Icon src={<VectorIcon family={MaterialCommunityIcons} name="cog" />} />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

// Custom TabBar fallback
import { View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const CustomTabBar = ({ tabs, activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();

  const handlePress = async (tabName) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onTabPress(tabName);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          onPress={() => handlePress(tab.name)}
          style={[styles.tab, tab.isCenter && styles.centerTab]}
        >
          {tab.isCenter ? (
            <View style={styles.centerButton}>
              <Ionicons name="add" size={28} color="#fff" />
            </View>
          ) : (
            <>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={activeTab === tab.name ? '#0D7C7A' : '#64748B'}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[
                styles.label,
                activeTab === tab.name && styles.activeLabel
              ]}>
                {tab.name}
              </Text>
            </>
          )}
        </Pressable>
      ))}
    </View>
  );
};
```

**Expo packages:**
- `expo-router/unstable-native-tabs`
- `expo-haptics`
- `@expo/vector-icons`
- `react-native-safe-area-context`
<!-- COMPONENT:END:3.6-tab-bar -->

---

<!-- COMPONENT:START:3.7-stepper-progress-indicator -->
<!-- DONE:3.7-stepper-progress-indicator -->
## 3.7 Stepper / Progress Indicator

**Used In:** Screens 5, 19-21

**Purpose:** Show progress through multi-step flows.

### Props

```typescript
interface StepperProps {
  steps: Array<{
    label: string;
    description?: string;
  }>;
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}
```

### Web Implementation

```tsx
const Stepper = ({ steps, currentStep, orientation = 'horizontal' }) => (
  <div className={cn(
    "flex",
    orientation === 'horizontal' ? "flex-row items-center" : "flex-col"
  )}>
    {steps.map((step, index) => (
      <div key={index} className={cn(
        "flex items-center",
        orientation === 'horizontal' && index < steps.length - 1 && "flex-1"
      )}>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            index < currentStep && "bg-teal-600 text-white",
            index === currentStep && "bg-teal-600 text-white ring-4 ring-teal-100",
            index > currentStep && "bg-slate-200 text-slate-500"
          )}>
            {index < currentStep ? <Check size={16} /> : index + 1}
          </div>
          <span className={cn(
            "text-sm",
            index <= currentStep ? "text-slate-900" : "text-slate-500"
          )}>
            {step.label}
          </span>
        </div>
        
        {index < steps.length - 1 && orientation === 'horizontal' && (
          <div className={cn(
            "flex-1 h-0.5 mx-4",
            index < currentStep ? "bg-teal-600" : "bg-slate-200"
          )} />
        )}
      </div>
    ))}
  </div>
);
```

### Mobile Implementation

```tsx
const Stepper = ({ steps, currentStep }) => (
  <View style={styles.container}>
    {steps.map((step, index) => (
      <View key={index} style={styles.stepRow}>
        <View style={[
          styles.circle,
          index < currentStep && styles.completedCircle,
          index === currentStep && styles.activeCircle,
        ]}>
          {index < currentStep ? (
            <Ionicons name="checkmark" size={14} color="#fff" />
          ) : (
            <Text style={[
              styles.number,
              index <= currentStep && styles.activeNumber
            ]}>
              {index + 1}
            </Text>
          )}
        </View>
        
        {index < steps.length - 1 && (
          <View style={[
            styles.connector,
            index < currentStep && styles.completedConnector
          ]} />
        )}
      </View>
    ))}
  </View>
);
```
<!-- COMPONENT:END:3.7-stepper-progress-indicator -->

---

# Part 4: Feedback Components

---

<!-- COMPONENT:START:4.1-toast-notification -->
<!-- DONE:4.1-toast-notification -->
## 4.1 Toast / Notification

**Used In:** All screens (feedback)

**Purpose:** Brief, non-blocking feedback messages.

### Props

```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Web Implementation

```tsx
// shadcn/ui sonner - VERIFIED
import { toast } from "sonner";

const showToast = ({ type, title, description, action }) => {
  toast[type](title, {
    description,
    action: action && {
      label: action.label,
      onClick: action.onClick,
    },
  });
};

// Toaster component in layout
import { Toaster } from "@/components/ui/sonner";
<Toaster position="bottom-right" richColors />
```

**shadcn/ui base:** `sonner`

### Mobile Implementation

```tsx
// Option 1: expo-notifications for system-level notifications
import * as Notifications from 'expo-notifications';

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Schedule immediate notification
const showSystemNotification = async ({ title, body }) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null, // Immediate
  });
};

// Option 2: react-native-toast-message for in-app toasts
import Toast from 'react-native-toast-message';

const showToast = ({ type, title, description }) => {
  Toast.show({
    type, // 'success' | 'error' | 'info'
    text1: title,
    text2: description,
    visibilityTime: 3000,
    position: 'bottom',
  });
};

// Toast component in App root
<Toast config={toastConfig} />
```

**Expo packages:**
- `expo-notifications` (for system notifications)
- `react-native-toast-message` (for in-app toasts)
<!-- COMPONENT:END:4.1-toast-notification -->

---

<!-- COMPONENT:START:4.2-alert-banner -->
<!-- DONE:4.2-alert-banner -->
## 4.2 Alert / Banner

**Used In:** Screens 4, 17, 21, 25, 32

**Purpose:** Prominent inline messages.

### Web Implementation

```tsx
// shadcn/ui Alert - VERIFIED
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

const AlertBanner = ({ type, title, children, dismissable, onDismiss, action }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };
  const Icon = icons[type];

  const variants = {
    success: 'border-green-500 bg-green-50 text-green-800',
    error: 'border-red-500 bg-red-50 text-red-800',
    warning: 'border-amber-500 bg-amber-50 text-amber-800',
    info: 'border-teal-500 bg-teal-50 text-teal-800',
  };

  return (
    <Alert className={cn(variants[type], "relative")}>
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
      {action && <div className="mt-2">{action}</div>}
      {dismissable && (
        <button onClick={onDismiss} className="absolute top-2 right-2">
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
};
```

**shadcn/ui base:** `Alert`

### Mobile Implementation

```tsx
const Alert = ({ type, title, children, dismissable, onDismiss, action }) => {
  const icons = {
    success: 'checkmark-circle',
    error: 'alert-circle',
    warning: 'warning',
    info: 'information-circle',
  };

  return (
    <View style={[styles.alert, styles[type]]}>
      <Ionicons name={icons[type]} size={20} color={styles[`${type}Icon`].color} />
      <View style={styles.content}>
        {title && <Text style={[styles.title, styles[`${type}Text`]]}>{title}</Text>}
        <Text style={[styles.description, styles[`${type}Text`]]}>{children}</Text>
        {action}
      </View>
      {dismissable && (
        <Pressable onPress={onDismiss} style={styles.dismiss}>
          <Ionicons name="close" size={20} color={styles[`${type}Icon`].color} />
        </Pressable>
      )}
    </View>
  );
};
```
<!-- COMPONENT:END:4.2-alert-banner -->

---

<!-- COMPONENT:START:4.3-empty-state -->
<!-- DONE:4.3-empty-state -->
## 4.3 EmptyState

**Used In:** Screen 34 (all variants)

**Purpose:** Friendly display when content is empty.

### Web Implementation

```tsx
// shadcn/ui Empty - VERIFIED
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const EmptyState = ({ illustration, title, description, primaryAction, secondaryAction }) => (
  <Empty>
    {illustration && (
      <EmptyMedia>
        <EmptyIllustration type={illustration} className="w-40 h-40" />
      </EmptyMedia>
    )}
    <EmptyHeader>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div className="flex gap-3">
        {primaryAction && (
          <Button onClick={primaryAction.onPress}>{primaryAction.label}</Button>
        )}
        {secondaryAction && (
          <Button variant="ghost" onClick={secondaryAction.onPress}>
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </EmptyContent>
  </Empty>
);
```

**shadcn/ui base:** `Empty`

### Mobile Implementation

```tsx
// CORRECTED: Use expo-image for illustrations
import { Image } from 'expo-image';
import { View, Text } from 'react-native';

const EmptyState = ({ illustration, title, description, primaryAction, secondaryAction }) => (
  <View style={styles.container}>
    {illustration && (
      <Image 
        source={illustrations[illustration]} 
        style={styles.illustration}
        contentFit="contain"
      />
    )}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.actions}>
      {primaryAction && (
        <Button onPress={primaryAction.onPress}>{primaryAction.label}</Button>
      )}
      {secondaryAction && (
        <Button variant="ghost" onPress={secondaryAction.onPress}>
          {secondaryAction.label}
        </Button>
      )}
    </View>
  </View>
);
```

**Expo packages:** `expo-image`
<!-- COMPONENT:END:4.3-empty-state -->

---

<!-- COMPONENT:START:4.4-skeleton -->
<!-- DONE:4.4-skeleton -->
## 4.4 Skeleton

**Used In:** All screens (loading states)

**Purpose:** Loading placeholder that mimics content structure.

### Web Implementation

```tsx
// shadcn/ui Skeleton - VERIFIED
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = ({ variant = 'rectangular', width, height }) => (
  <Skeleton 
    className={cn(
      variant === 'circular' && 'rounded-full',
      variant === 'text' && 'h-4 rounded',
    )}
    style={{ width, height }}
  />
);

// Preset skeletons
const SubscriptionCardSkeleton = () => (
  <div className="flex items-center gap-4 p-4 border rounded-lg">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
    <Skeleton className="h-6 w-16" />
  </div>
);
```

**shadcn/ui base:** `Skeleton`

### Mobile Implementation

```tsx
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Skeleton = ({ variant = 'rectangular', width, height, style }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={[
      styles.skeleton,
      variant === 'circular' && styles.circular,
      { width, height },
      style,
    ]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-200, 200],
              }),
            }],
          },
        ]}
      >
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};
```

**Expo packages:** `expo-linear-gradient`
<!-- COMPONENT:END:4.4-skeleton -->

---

<!-- COMPONENT:START:4.5-tooltip -->
<!-- DONE:4.5-tooltip -->
## 4.5 Tooltip

**Used In:** Screens 7, 10, 14, 18

**Purpose:** Contextual help on hover/long-press.

### Web Implementation

```tsx
// shadcn/ui Tooltip - VERIFIED
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipWrapper = ({ content, children, side = 'top' }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
```

**shadcn/ui base:** `Tooltip`

### Mobile Implementation

```tsx
import { Pressable, View, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

const Tooltip = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  const handleLongPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <View>
      <Pressable onLongPress={handleLongPress}>
        {children}
      </Pressable>
      {visible && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipText}>{content}</Text>
        </View>
      )}
    </View>
  );
};
```

**Expo packages:** `expo-haptics`
<!-- COMPONENT:END:4.5-tooltip -->

---

# Part 5: Domain Components

---

<!-- COMPONENT:START:5.1-service-logo -->
<!-- DONE:5.1-service-logo -->
## 5.1 ServiceLogo

**Used In:** Screens 8, 11-13, 17, 25, 26, 30

**Purpose:** Display service logo with fallback.

### Implementation

```tsx
// Web
const ServiceLogo = ({ service, size }) => {
  const sizes = { xs: 24, sm: 32, md: 44, lg: 64 };
  const dimension = sizes[size];

  return (
    <Avatar size={size} shape="circle">
      {service.logoUrl ? (
        <AvatarImage src={service.logoUrl} alt={service.name} />
      ) : (
        <AvatarFallback className="bg-slate-100">
          {service.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

// CORRECTED Mobile - Use expo-image
import { Image } from 'expo-image';

const ServiceLogo = ({ service, size }) => {
  const sizes = { xs: 24, sm: 32, md: 44, lg: 64 };
  const dimension = sizes[size];
  const [error, setError] = useState(false);

  // Blurhash placeholder
  const blurhash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';

  return (
    <View style={[styles.container, { width: dimension, height: dimension }]}>
      {service.logoUrl && !error ? (
        <Image
          source={service.logoUrl}
          style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
          contentFit="cover"
          placeholder={{ blurhash }}
          transition={200}
          onError={() => setError(true)}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius: dimension / 2 }]}>
          <Text style={styles.fallbackText}>
            {service.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
};
```

**Expo packages:** `expo-image`
<!-- COMPONENT:END:5.1-service-logo -->

---

<!-- COMPONENT:START:5.2-subscription-card -->
<!-- DONE:5.2-subscription-card -->
## 5.2 SubscriptionCard

**Used In:** Screens 10, 11, 12, 17, 25, 26

**Purpose:** Display subscription summary.

*(uses ServiceLogo which uses expo-image)*
<!-- COMPONENT:END:5.2-subscription-card -->

---

<!-- COMPONENT:START:5.3-burner-card-visual -->
<!-- DONE:5.3-burner-card-visual -->
## 5.3 BurnerCardVisual

**Used In:** Screens 18, 21, 22

**Purpose:** Visual representation of a BurnerCard.

### Mobile Implementation

```tsx
import { LinearGradient } from 'expo-linear-gradient';

const BurnerCardVisual = ({ card, size = 'md' }) => {
  const { nickname, type, status, lastFour, spentAmount, spendLimit } = card;

  const statusGradients = {
    active: ['#0D7C7A', '#085E5C'],
    locked: ['#D97706', '#B45309'],
    expired: ['#64748B', '#475569'],
    used: ['#475569', '#334155'],
  };

  return (
    <LinearGradient
      colors={statusGradients[status]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, styles[size]]}
    >
      <View style={styles.header}>
        <Text style={styles.brand}>Klard</Text>
        <Badge variant={type}>{type}</Badge>
      </View>
      
      <Text style={styles.cardNumber}>•••• •••• •••• {lastFour}</Text>
      
      <View style={styles.footer}>
        <View>
          <Text style={styles.nickname}>{nickname}</Text>
          <Text style={styles.expiry}>{card.expiryMonth}/{card.expiryYear}</Text>
        </View>
        
        <View style={styles.spending}>
          <Text style={styles.spendLabel}>Spent</Text>
          <Text style={styles.spendAmount}>${spentAmount} / ${spendLimit}</Text>
        </View>
      </View>
      
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(spentAmount / spendLimit) * 100}%` }]} />
      </View>
    </LinearGradient>
  );
};
```

**Expo packages:** `expo-linear-gradient`
<!-- COMPONENT:END:5.3-burner-card-visual -->

---

<!-- COMPONENT:START:5.4-status-badge -->
<!-- IN-PROGRESS:5.4-status-badge -->
## 5.4 StatusBadge

**Used In:** Screens 11, 12, 18, 22, 24

**Purpose:** Consistent status display.

### Props

```typescript
interface StatusBadgeProps {
  status: 'active' | 'trial' | 'paused' | 'blocked' | 'cancelled' | 'locked' | 'expired' | 'pending';
}
```

### Implementation

```tsx
const statusConfig = {
  active: { label: 'Active', variant: 'success', icon: 'checkmark-circle' },
  trial: { label: 'Trial', variant: 'warning', icon: 'time' },
  paused: { label: 'Paused', variant: 'default', icon: 'pause-circle' },
  blocked: { label: 'Blocked', variant: 'error', icon: 'ban' },
  cancelled: { label: 'Cancelled', variant: 'default', icon: 'close-circle' },
  locked: { label: 'Locked', variant: 'warning', icon: 'lock-closed' },
  expired: { label: 'Expired', variant: 'default', icon: 'time' },
  pending: { label: 'Pending', variant: 'default', icon: 'hourglass' },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status];
  return (
    
      
      {config.label}
    
  );
};
```
<!-- COMPONENT:END:5.4-status-badge -->

---

<!-- COMPONENT:START:5.5-price-display -->
<!-- IN-PROGRESS:5.5-price-display -->
## 5.5 PriceDisplay

**Used In:** Screens 8, 11, 12, 13, 25, 27, 30

**Purpose:** Consistent price formatting.

### Props

```typescript
interface PriceDisplayProps {
  amount: number;
  currency?: string;
  billingCycle?: 'monthly' | 'yearly' | 'weekly' | 'one-time';
  size?: 'sm' | 'md' | 'lg';
  showChange?: {
    from: number;
    direction: 'increase' | 'decrease';
  };
}
```

### Implementation

```tsx
const PriceDisplay = ({ amount, currency = 'USD', billingCycle, size = 'md', showChange }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  const cycleLabels = {
    monthly: '/mo',
    yearly: '/yr',
    weekly: '/wk',
    'one-time': '',
  };

  return (
    <div className={cn("flex items-baseline gap-1", sizeStyles[size])}>
      {formatter.format(amount)}
      {billingCycle && (
        {cycleLabels[billingCycle]}
      )}
      {showChange && (
        <span className={cn(
          "text-sm flex items-center",
          showChange.direction === 'increase' ? "text-red-500" : "text-green-500"
        )}>
          {showChange.direction === 'increase' ?  : }
          {formatter.format(Math.abs(amount - showChange.from))}

      )}

  );
};
```
<!-- COMPONENT:END:5.5-price-display -->

---

<!-- COMPONENT:START:5.6-alert-card -->
<!-- IN-PROGRESS:5.6-alert-card -->
## 5.6 AlertCard

**Used In:** Screens 24, 25, 26

**Purpose:** Display alert/notification items.

### Props

```typescript
interface AlertCardProps {
  alert: {
    id: string;
    type: 'renewal' | 'price-increase' | 'price-decrease' | 'blocked' | 'savings' | 'system';
    title: string;
    body: string;
    timestamp: Date;
    read: boolean;
    subscription?: {
      name: string;
      logoUrl?: string;
    };
    actionLabel?: string;
  };
  onPress: () => void;
  onDismiss?: () => void;
}
```

### Web Implementation

```tsx
const alertTypeConfig = {
  'renewal': { color: 'teal', icon: Calendar },
  'price-increase': { color: 'amber', icon: TrendingUp },
  'price-decrease': { color: 'green', icon: TrendingDown },
  'blocked': { color: 'red', icon: Shield },
  'savings': { color: 'green', icon: PiggyBank },
  'system': { color: 'slate', icon: Info },
};

const AlertCard = ({ alert, onPress, onDismiss }) => {
  const config = alertTypeConfig[alert.type];
  const Icon = config.icon;

  return (
    
      
        <div className={cn("p-2 rounded-full", `bg-${config.color}-100`)}>
          <Icon className={cn("h-5 w-5", `text-${config.color}-600`)} />
        
        
        
          
            {alert.title}
            {!alert.read && }
          
          {alert.body}
          
            {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
          
        
        
        {alert.subscription && (
          
        )}
        
        {alert.actionLabel && (
          {alert.actionLabel}
        )}
      
    
  );
};
```

### Mobile Implementation

```tsx
const AlertCard = ({ alert, onPress, onDismiss }) => {
  const config = alertTypeConfig[alert.type];

  return (
    
      
      
      
        
      
      
      
        
          {alert.title}
          {!alert.read && }
        
        {alert.body}
        
          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
        
      
      
      {alert.subscription && (
        
      )}

  );
};
```
<!-- COMPONENT:END:5.6-alert-card -->

---

<!-- COMPONENT:START:5.7-stat-card -->
<!-- IN-PROGRESS:5.7-stat-card -->
## 5.7 StatCard

**Used In:** Screens 10, 27, 28

**Purpose:** Display key metrics.

### Props

```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  icon?: ReactNode;
  onClick?: () => void;
}
```

### Web Implementation

```tsx
const StatCard = ({ label, value, trend, icon, onClick }) => (
  
    
      
        {label}
        {value}
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm mt-1",
            trend.direction === 'up' && "text-green-600",
            trend.direction === 'down' && "text-red-600",
            trend.direction === 'neutral' && "text-slate-500"
          )}>
            {trend.direction === 'up' && }
            {trend.direction === 'down' && }
            {trend.value}
          
        )}
      
      {icon && (
        
          {icon}
        
      )}
    
  
);
```

### Mobile Implementation

```tsx
const StatCard = ({ label, value, trend, icon, onClick }) => (
  
    
      {label}
      {value}
      {trend && (
        
          <Ionicons 
            name={trend.direction === 'up' ? 'trending-up' : 'trending-down'} 
            size={14} 
            color={trend.direction === 'up' ? '#059669' : '#DC2626'}
          />
          {trend.value}
        
      )}
    
    {icon && (
      {icon}
    )}

);
```
<!-- COMPONENT:END:5.7-stat-card -->

---

# Part 6: Authentication Components

---

<!-- COMPONENT:START:6.1-oauth-social-login -->
<!-- DONE:6.1-oauth-social-login -->
## 6.1 OAuth / Social Login

**Used In:** Screens 1, 2, 15

**Purpose:** Social authentication (Google, Apple).

### Web Implementation

```tsx
import { Button } from "@/components/ui/button";

const SocialLoginButtons = () => (
  <div className="space-y-3">
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
      <GoogleIcon className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
    <Button variant="outline" className="w-full" onClick={handleAppleLogin}>
      <AppleIcon className="mr-2 h-4 w-4" />
      Continue with Apple
    </Button>
  </div>
);
```

### Mobile Implementation

```tsx
// NEW: Use expo-web-browser for OAuth flows
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import * as AppleAuthentication from 'expo-apple-authentication';

// Google OAuth
const handleGoogleLogin = async () => {
  const redirectUrl = Linking.createURL('oauth/callback');
  
  const result = await WebBrowser.openAuthSessionAsync(
    `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=openid%20email%20profile`,
    redirectUrl,
    {
      preferEphemeralSession: true, // Don't persist browser session
    }
  );

  if (result.type === 'success') {
    const { url } = result;
    // Extract authorization code from URL and exchange for tokens
    const code = new URL(url).searchParams.get('code');
    await exchangeCodeForTokens(code);
  }
};

// Apple Sign In (iOS)
const handleAppleLogin = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    
    // credential contains identityToken, user, email, fullName
    await authenticateWithAppleCredential(credential);
  } catch (error) {
    if (error.code === 'ERR_REQUEST_CANCELED') {
      // User cancelled
    }
  }
};

// Social Login Buttons Component
const SocialLoginButtons = () => (
  <View style={styles.container}>
    <Button variant="outline" onPress={handleGoogleLogin}>
      <GoogleIcon />
      <Text>Continue with Google</Text>
    </Button>
    
    {Platform.OS === 'ios' && (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        style={styles.appleButton}
        onPress={handleAppleLogin}
      />
    )}
  </View>
);
```

**Expo packages:**
- `expo-web-browser` (`openAuthSessionAsync`)
- `expo-apple-authentication`
- `expo-linking`
<!-- COMPONENT:END:6.1-oauth-social-login -->

---

# Part 7: Component Index by Screen

---

<!-- SECTION:START:7-component-index -->
<!-- IN-PROGRESS:7-component-index -->
## Quick Reference: Components Used Per Screen

| Screen | Key Components |
|--------|----------------|
| 1. Login | Input, PasswordInput, Button, Card, SocialLoginButtons |
| 2. Sign Up | Input, PasswordInput, Button, Card, Checkbox |
| 3. Forgot Password | Input, Button, Card, Alert |
| 4. Email Verification | Card, Button, Spinner, Alert |
| 5. Welcome | Stepper, Card, Button, Illustration |
| 6. Plan Selection | Card, SegmentedControl, Badge, Button, PriceDisplay |
| 7. Import Hub | Card, Button, Tooltip |
| 8. Add First Subscription | SearchInput, Input, Select, DatePicker, CurrencyInput, Button |
| 9. BurnerCard Tutorial | Modal, Card, Button, Illustration |
| 10. Main Dashboard | Sidebar/TabBar, StatCard, SubscriptionCard, AlertCard, FAB |
| 11. Subscription List | SearchInput, Tabs, Badge, SubscriptionCard, EmptyState |
| 12. Subscription Detail | Card, Badge, StatusBadge, PriceDisplay, ProgressBar, Button |
| 13. Add/Edit Modal | Modal, SearchInput, Input, Select, DatePicker, CurrencyInput |
| 14. Calendar View | Calendar, Card, Badge, SegmentedControl |
| 15. Email Connection | Card, Button, Alert, Spinner |
| 16. Scan Progress | Spinner, ProgressBar, Card, Button |
| 17. Scan Results | Checkbox, Card, Badge, Button, EmptyState |
| 18. BurnerCard Overview | BurnerCardVisual, Card, Badge, ProgressBar, EmptyState |
| 19. Create Card Step 1 | Modal, Card, Stepper, Button |
| 20. Create Card Step 2 | Modal, Input, CurrencyInput, Select, Switch, Slider, Stepper |
| 21. Create Card Step 3 | Modal, BurnerCardVisual, Card, Button, Alert |
| 22. Card Detail | BurnerCardVisual, Card, ProgressBar, StatusBadge, Switch |
| 23. Card Rules Config | Modal, Input, CurrencyInput, Select, Switch, Slider, Button |
| 24. Alerts Center | Tabs, AlertCard, Badge, EmptyState |
| 25. Price Alert Detail | Modal, Card, PriceDisplay, Badge, Button |
| 26. Renewal Reminder | Modal, Card, SubscriptionCard, Button |
| 27. Analytics Dashboard | StatCard, Tabs, SegmentedControl, Charts |
| 28. Savings Report | Card, StatCard, ProgressBar, Button |
| 29. Export Modal | Modal, Checkbox, Select, DatePicker, Button |
| 30. Alternative Finder | SearchInput, Card, Badge, PriceDisplay, Button |
| 31. Settings | Tabs, Switch, Input, Select, Button, Card |
| 32. Profile & Plan | Card, Badge, Button, PriceDisplay |
| 33. Help & FAQ | SearchInput, Accordion, Card, Button |
| 34. Empty States | EmptyState (all variants) |
<!-- SECTION:END:7-component-index -->

---

# Part 8: Shared Utilities & Hooks

---

<!-- SECTION:START:8.1-format-utilities -->
<!-- IN-PROGRESS:8.1-format-utilities -->
## 8.1 Format Utilities

```typescript
// utils/format.ts

export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date: Date, format = 'PPP') => {
  return formatFn(date, format);
};

export const formatRelativeDate = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatCardNumber = (lastFour: string) => {
  return `•••• •••• •••• ${lastFour}`;
};
```
<!-- SECTION:END:8.1-format-utilities -->

---

<!-- SECTION:START:8.2-shared-hooks -->
<!-- IN-PROGRESS:8.2-shared-hooks -->
## 8.2 Shared Hooks

```typescript
// hooks/useDebounce.ts
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// hooks/useHaptics.ts (Mobile only)
import * as Haptics from 'expo-haptics';

export const useHaptics = () => ({
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  warning: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
});
```
<!-- SECTION:END:8.2-shared-hooks -->

---

<!-- SECTION:START:8.3-theme-constants -->
<!-- IN-PROGRESS:8.3-theme-constants -->
## 8.3 Theme Constants

```typescript
// constants/theme.ts

export const colors = {
  primary: {
    50: '#EFFCFB',
    100: '#D5F5F4',
    500: '#0D7C7A',
    600: '#0A6563',
    700: '#084E4C',
  },
  success: {
    50: '#ECFDF5',
    500: '#059669',
    600: '#047857',
  },
  warning: {
    50: '#FFFBEB',
    500: '#D97706',
    600: '#B45309',
  },
  error: {
    50: '#FEF2F2',
    500: '#DC2626',
    600: '#B91C1C',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
```
<!-- SECTION:END:8.3-theme-constants -->

---

# End of Component Specifications

---

## Summary

**Total Components Defined:** 50+

**Categories:**
- Foundational UI: 11 components (added Slider)
- Form Components: 5 components  
- Layout Components: 7 components
- Feedback Components: 5 components
- Domain Components: 7 components
- Authentication Components: 1 component (NEW)
- Utilities & Hooks: 10+ utilities

**Platform Coverage:**
- Web: shadcn/ui base with Klard customizations
- Mobile: Expo SDK 54 + React Native with native platform components

**Key Dependencies:**

**Web:**
- shadcn/ui (all components)
- lucide-react (icons)
- date-fns (formatting)
- sonner (toasts)

**Mobile:**
```json
{
  "expo": "~54.0.0",
  "expo-haptics": "~14.0.0",
  "expo-image": "~2.0.0",
  "expo-linear-gradient": "~14.0.0",
  "expo-checkbox": "~4.0.0",
  "expo-notifications": "~0.29.0",
  "expo-web-browser": "~14.0.0",
  "expo-apple-authentication": "~7.0.0",
  "expo-linking": "~7.0.0",
  "@expo/vector-icons": "^14.0.0",
  "@expo/ui": "~0.1.0",
  "react-native-safe-area-context": "~5.0.0",
  "@gorhom/bottom-sheet": "^5.0.0",
  "@react-native-community/slider": "^4.5.0",
  "react-native-toast-message": "^2.0.0",
  "react-native-reanimated": "~3.16.0",
  "react-native-gesture-handler": "~2.20.0"
}
```


## Component Usage Frequency (MVP Screens 1-34)

| Component | Screen Count | Notes |
|-----------|--------------|-------|
| Button | 34 | Used on every screen |
| Card | 32 | Primary container element |
| Badge | 22 | Status indicators, counts |
| Separator | 14 | Section dividers |
| Alert | 13 | Error/success/info messaging |
| Select | 12 | Dropdowns and pickers |
| Input | 11 | Text entry |
| ServiceLogo | 10 | Subscription service branding |
| EmptyState | 9 | Zero-data states |
| Switch | 9 | Toggle settings |
| Skeleton | 8 | Loading placeholders |
| Modal | 7 | Overlays and dialogs |
| Tooltip | 9 | Help text and info |
| ProgressBar | 7 | Progress indication |
| Chart | 5 | Analytics visualizations |
| Tabs | 5 | Content organization |
| DatePicker | 6 | Date selection |
| Checkbox | 6 | Multi-select options |
| SearchInput | 6 | Search functionality |
| BottomSheet | 4 | Mobile action sheets |
| Stepper | 5 | Multi-step flows |
| Avatar | 4 | User profiles |
| Calendar | 1 | Calendar view |
| Accordion | 1 | FAQ expandable sections |
| Slider | 2 | Range/limit selection |
