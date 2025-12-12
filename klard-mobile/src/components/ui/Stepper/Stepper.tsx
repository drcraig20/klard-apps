import React from 'react';
import { View, Text, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '@/hooks';
import { styles } from './stepper.styles';

export interface Step {
  label: string;
  description?: string;
  status?: 'completed' | 'current' | 'upcoming';
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

type StepState = 'completed' | 'current' | 'upcoming';

/**
 * Derive step state based on index and currentStep
 * Respects explicit status prop if provided
 */
function getStepState(index: number, currentStep: number, explicitStatus?: StepState): StepState {
  if (explicitStatus) return explicitStatus;
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'upcoming';
}

/**
 * Build accessibility label for a step
 */
function buildStepAccessibilityLabel(
  index: number,
  totalSteps: number,
  label: string,
  description: string | undefined,
  state: StepState
): string {
  const position = `Step ${index + 1} of ${totalSteps}`;
  const statusText = state === 'completed' ? 'completed' : state === 'current' ? 'in progress' : 'not started';
  const desc = description ? `, ${description}` : '';
  return `${position}: ${label}${desc}, ${statusText}`;
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  accessibilityLabel,
  style,
}: StepperProps) {
  const colors = useThemeColors();

  // Return null for empty steps
  if (!steps || steps.length === 0) {
    if (__DEV__) {
      console.warn('[Stepper] No steps provided');
    }
    return null;
  }

  const isHorizontal = orientation === 'horizontal';

  const getCircleStyle = (state: StepState): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.circle,
      backgroundColor: state === 'upcoming' ? colors.muted : colors.primary,
    };

    if (state === 'current') {
      return { ...baseStyle, ...styles.circleActive };
    }

    return baseStyle;
  };

  const getCircleTextColor = (state: StepState): string => {
    return state === 'upcoming' ? colors.mutedForeground : '#FFFFFF';
  };

  const getLabelColor = (state: StepState): string => {
    return state === 'upcoming' ? colors.textSecondary : colors.textPrimary;
  };

  const getConnectorColor = (index: number): string => {
    return index < currentStep ? colors.primary : colors.muted;
  };

  // Calculate safeCurrent for accessibility value (must be within bounds)
  const safeCurrent = Math.min(Math.max(currentStep, 0), steps.length - 1);

  return (
    <View
      testID="stepper-container"
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        now: safeCurrent + 1,
        min: 1,
        max: steps.length,
        text: `Step ${safeCurrent + 1} of ${steps.length}`,
      }}
      style={[
        isHorizontal ? styles.container : styles.containerVertical,
        style,
      ]}
    >
      {steps.map((step, index) => {
        const state = getStepState(index, currentStep, step.status);
        const isLast = index === steps.length - 1;
        const stepAccessibilityLabel = buildStepAccessibilityLabel(
          index,
          steps.length,
          step.label,
          step.description,
          state
        );

        return (
          <React.Fragment key={index}>
            <View
              style={[
                isHorizontal ? styles.stepWrapper : styles.stepWrapperVertical,
                isHorizontal && !isLast && { flex: 1 },
              ]}
            >
              <View
                accessibilityRole="text"
                accessibilityLabel={stepAccessibilityLabel}
                accessibilityState={{ selected: state === 'current' }}
                testID={
                  state === 'completed'
                    ? 'step-completed'
                    : state === 'current'
                    ? 'step-active'
                    : 'step-pending'
                }
                style={isHorizontal ? styles.stepContent : styles.stepContentVertical}
              >
                {/* Step Circle */}
                <View style={getCircleStyle(state)}>
                  {state === 'completed' ? (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#FFFFFF"
                    />
                  ) : (
                    <Text
                      style={[
                        styles.circleNumber,
                        { color: getCircleTextColor(state) },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>

                {/* Step Label */}
                <View style={styles.labelContainer}>
                  <Text
                    style={[
                      styles.label,
                      state === 'current' && styles.labelActive,
                      { color: getLabelColor(state) },
                    ]}
                  >
                    {step.label}
                  </Text>
                  {step.description && (
                    <Text
                      style={[
                        styles.description,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {step.description}
                    </Text>
                  )}
                </View>
              </View>

              {/* Horizontal Connector (inside step wrapper for flex) */}
              {!isLast && isHorizontal && (
                <View
                  testID="step-connector"
                  style={[
                    styles.connectorHorizontal,
                    { backgroundColor: getConnectorColor(index) },
                  ]}
                />
              )}
            </View>

            {/* Vertical Connector */}
            {!isLast && !isHorizontal && (
              <View
                testID="step-connector"
                style={[
                  styles.connectorVertical,
                  { backgroundColor: getConnectorColor(index) },
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
