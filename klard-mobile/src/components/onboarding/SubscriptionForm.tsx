import { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import {
  en,
  POPULAR_SERVICES,
  AddSubscriptionSchema,
  SUBSCRIPTION_CATEGORIES,
  type PopularService,
  type OnboardingBillingCycle,
  type SubscriptionCategory,
  type AddSubscription,
} from '@klard-apps/commons';
import { useSubscriptionStore } from '@/stores/subscriptionStore';
import { ServiceGrid } from './ServiceGrid';

// Klard Design System Colors
const colors = {
  background: '#0F172A',
  glassBg: 'rgba(30, 41, 59, 0.6)',
  primary: '#15B5B0',
  primaryDark: '#0D7C7A',
  foreground: '#F8FAFC',
  muted: '#94A3B8',
  border: 'rgba(148, 163, 184, 0.12)',
  error: '#EF4444',
};

/**
 * SubscriptionForm - Main component for adding subscription in onboarding
 *
 * Two states:
 * 1. Selection state: Shows ServiceGrid for selecting a popular service
 * 2. Form state: Shows form fields after service is selected
 *
 * Features:
 * - Pre-fills form with service defaults
 * - Validates with Zod before submission
 * - Haptic feedback on submit
 * - Navigation to next screen after adding
 */
export function SubscriptionForm() {
  const addSubscription = useSubscriptionStore((state) => state.addSubscription);

  // Form state
  const [selectedService, setSelectedService] = useState<PopularService | null>(null);
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState<OnboardingBillingCycle>('monthly');
  const [renewalDate, setRenewalDate] = useState(new Date());
  const [category, setCategory] = useState<SubscriptionCategory>('streaming');
  const [cancellationUrl, setCancellationUrl] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form when service is selected
  const handleServiceSelect = useCallback((service: PopularService) => {
    setSelectedService(service);
    setPrice(service.defaultPrice.toString());
    setBillingCycle(service.defaultCycle);
    setCategory(service.category);
    setCancellationUrl(service.cancellationUrl || '');

    // Set default renewal date to 1 month from now
    const defaultRenewalDate = new Date();
    defaultRenewalDate.setMonth(defaultRenewalDate.getMonth() + 1);
    setRenewalDate(defaultRenewalDate);
  }, []);

  // Handle "Change" service button
  const handleChangeService = useCallback(() => {
    Haptics.selectionAsync();
    setSelectedService(null);
  }, []);

  // Handle date picker
  const handleDateChange = useCallback((_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep open on iOS
    if (selectedDate) {
      setRenewalDate(selectedDate);
    }
  }, []);

  // Form submission
  const handleSubmit = useCallback(() => {
    if (!selectedService) return;

    // Build form data
    const formData: AddSubscription = {
      serviceName: selectedService.name,
      price: parseFloat(price),
      billingCycle,
      nextRenewalDate: renewalDate.toISOString(),
      category,
      cancellationUrl: cancellationUrl || undefined,
    };

    // Validate with Zod
    const result = AddSubscriptionSchema.safeParse(formData);

    if (!result.success) {
      // Extract errors
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);

      // Show alert for validation errors
      Alert.alert('Validation Error', 'Please check the form and try again.');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    // Clear errors
    setErrors({});

    // Add to store
    addSubscription(result.data);

    // Success haptic and feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Success',
      en.onboarding.addSubscription.toast.success.replace('{{serviceName}}', selectedService.name)
    );

    // Navigate to next screen
    router.push('/onboarding-burnercard');
  }, [selectedService, price, billingCycle, renewalDate, category, cancellationUrl, addSubscription]);

  // Skip handler
  const handleSkip = useCallback(() => {
    Haptics.selectionAsync();
    router.push('/onboarding-burnercard');
  }, []);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Step indicator */}
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>{en.onboarding.addSubscription.stepIndicator}</Text>
      </View>

      {/* Skip button */}
      <Pressable onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipText}>{en.onboarding.navigation.skip}</Text>
      </Pressable>

      {/* Selection state: Show ServiceGrid */}
      {!selectedService && (
        <View style={styles.selectionContainer}>
          <Text style={styles.headline}>{en.onboarding.addSubscription.headline}</Text>
          <ServiceGrid onSelect={handleServiceSelect} />
        </View>
      )}

      {/* Form state: Show form fields */}
      {selectedService && (
        <View style={styles.formContainer}>
          {/* Service header */}
          <ServiceHeader service={selectedService} onChangeService={handleChangeService} />

          {/* Price input */}
          <FormField label={en.onboarding.addSubscription.labels.price} error={errors.price}>
            <TextInput
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
          </FormField>

          {/* Billing cycle picker */}
          <FormField
            label={en.onboarding.addSubscription.labels.billingCycle}
            error={errors.billingCycle}
          >
            <View style={styles.cycleButtons}>
              <CycleButton
                label={en.onboarding.addSubscription.billingCycles.monthly}
                value="monthly"
                selected={billingCycle === 'monthly'}
                onPress={() => setBillingCycle('monthly')}
              />
              <CycleButton
                label={en.onboarding.addSubscription.billingCycles.annual}
                value="annual"
                selected={billingCycle === 'annual'}
                onPress={() => setBillingCycle('annual')}
              />
            </View>
          </FormField>

          {/* Next renewal date */}
          <FormField
            label={en.onboarding.addSubscription.labels.renewalDate}
            error={errors.nextRenewalDate}
          >
            <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
              <Text style={styles.dateText}>{renewalDate.toLocaleDateString()}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={renewalDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </FormField>

          {/* Category picker */}
          <FormField label={en.onboarding.addSubscription.labels.category} error={errors.category}>
            <CategoryPicker value={category} onChange={setCategory} />
          </FormField>

          {/* Cancellation URL (optional) */}
          <FormField
            label={en.onboarding.addSubscription.labels.cancellationUrl}
            error={errors.cancellationUrl}
            helperText={en.onboarding.addSubscription.helperText.optional}
          >
            <TextInput
              value={cancellationUrl}
              onChangeText={setCancellationUrl}
              placeholder="https://..."
              placeholderTextColor={colors.muted}
              style={styles.input}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </FormField>

          {/* Submit button */}
          <Pressable onPress={handleSubmit} style={styles.buttonPressable}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buttonText}>
                {en.onboarding.addSubscription.buttons.addSubscription}
              </Text>
            </LinearGradient>
          </Pressable>

          {/* Skip button (bottom) */}
          <Pressable onPress={handleSkip} style={styles.skipBottomButton}>
            <Text style={styles.skipBottomText}>
              {en.onboarding.addSubscription.buttons.skipForNow}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

/**
 * ServiceHeader - Displays selected service with color dot and change button
 * Separated for Single Responsibility Principle
 */
interface ServiceHeaderProps {
  service: PopularService;
  onChangeService: () => void;
}

function ServiceHeader({ service, onChangeService }: ServiceHeaderProps) {
  return (
    <BlurView intensity={40} tint="dark" style={styles.serviceHeader}>
      <View style={styles.serviceInfo}>
        <View style={[styles.serviceDot, { backgroundColor: service.color }]} />
        <View>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceCategory}>
            {service.category.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>
      <Pressable onPress={onChangeService}>
        <Text style={styles.changeButton}>Change</Text>
      </Pressable>
    </BlurView>
  );
}

/**
 * FormField - Reusable form field wrapper with label, error, and helper text
 * Follows DRY principle
 */
interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

function FormField({ label, error, helperText, children }: FormFieldProps) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {children}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

/**
 * CycleButton - Individual billing cycle button
 * Separated for Single Responsibility Principle
 */
interface CycleButtonProps {
  label: string;
  value: OnboardingBillingCycle;
  selected: boolean;
  onPress: () => void;
}

function CycleButton({ label, selected, onPress }: CycleButtonProps) {
  const handlePress = useCallback(() => {
    Haptics.selectionAsync();
    onPress();
  }, [onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.cycleButton, selected && styles.cycleButtonSelected]}
    >
      <Text style={[styles.cycleButtonText, selected && styles.cycleButtonTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * CategoryPicker - Simple dropdown-style picker for subscription category
 * Follows Interface Segregation Principle
 */
interface CategoryPickerProps {
  value: SubscriptionCategory;
  onChange: (value: SubscriptionCategory) => void;
}

function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (category: SubscriptionCategory) => {
      Haptics.selectionAsync();
      onChange(category);
      setIsOpen(false);
    },
    [onChange]
  );

  const displayValue = useMemo(() => {
    return value.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }, [value]);

  return (
    <View>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.pickerButton}>
        <Text style={styles.pickerText}>{displayValue}</Text>
        <Text style={styles.pickerArrow}>{isOpen ? '▲' : '▼'}</Text>
      </Pressable>

      {isOpen && (
        <BlurView intensity={40} tint="dark" style={styles.pickerDropdown}>
          {SUBSCRIPTION_CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => handleSelect(cat)}
              style={[styles.pickerOption, value === cat && styles.pickerOptionSelected]}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  value === cat && styles.pickerOptionTextSelected,
                ]}
              >
                {cat.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Text>
            </Pressable>
          ))}
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  stepIndicator: {
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '500',
  },
  selectionContainer: {
    marginTop: 24,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  formContainer: {
    marginTop: 24,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
  },
  serviceCategory: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  changeButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.glassBg,
    borderRadius: 12,
    padding: 16,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    marginTop: 4,
  },
  helperText: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
  },
  cycleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cycleButton: {
    flex: 1,
    backgroundColor: colors.glassBg,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cycleButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cycleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.muted,
  },
  cycleButtonTextSelected: {
    color: colors.foreground,
  },
  dateButton: {
    backgroundColor: colors.glassBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateText: {
    fontSize: 16,
    color: colors.foreground,
  },
  pickerButton: {
    backgroundColor: colors.glassBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    color: colors.foreground,
  },
  pickerArrow: {
    fontSize: 12,
    color: colors.muted,
  },
  pickerDropdown: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerOptionSelected: {
    backgroundColor: 'rgba(21, 181, 176, 0.2)',
  },
  pickerOptionText: {
    fontSize: 16,
    color: colors.foreground,
  },
  pickerOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  buttonPressable: {
    marginTop: 32,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    letterSpacing: 0.3,
  },
  skipBottomButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipBottomText: {
    fontSize: 16,
    color: colors.muted,
    fontWeight: '500',
  },
});
