import React from 'react';
import { View, Text, useColorScheme, type StyleProp, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  circleStyles,
  circleTextStyles,
  labelStyles,
  descriptionStyles,
  connectorStyles,
  layoutStyles,
} from './stepper.styles';

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
  const isDark = useColorScheme() === 'dark';

  // Return null for empty steps
  if (!steps || steps.length === 0) {
    if (__DEV__) {
      console.warn('[Stepper] No steps provided');
    }
    return null;
  }

  const isHorizontal = orientation === 'horizontal';

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
        isHorizontal ? layoutStyles.container : layoutStyles.containerVertical,
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
        const isConnectorCompleted = index < currentStep;

        return (
          <React.Fragment key={index}>
            <View
              style={[
                isHorizontal ? layoutStyles.stepWrapper : layoutStyles.stepWrapperVertical,
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
                style={isHorizontal ? layoutStyles.stepContent : layoutStyles.stepContentVertical}
              >
                {/* Step Circle */}
                <View style={circleStyles(isDark, { state })}>
                  {state === 'completed' ? (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#FFFFFF"
                    />
                  ) : (
                    <Text style={circleTextStyles(isDark, { state })}>
                      {index + 1}
                    </Text>
                  )}
                </View>

                {/* Step Label */}
                <View style={layoutStyles.labelContainer}>
                  <Text style={labelStyles(isDark, { state })}>
                    {step.label}
                  </Text>
                  {step.description && (
                    <Text style={descriptionStyles(isDark, {})}>
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
                    layoutStyles.connectorHorizontal,
                    ...connectorStyles(isDark, { completed: isConnectorCompleted ? 'true' : 'false' }),
                  ]}
                />
              )}
            </View>

            {/* Vertical Connector */}
            {!isLast && !isHorizontal && (
              <View
                testID="step-connector"
                style={[
                  layoutStyles.connectorVertical,
                  ...connectorStyles(isDark, { completed: isConnectorCompleted ? 'true' : 'false' }),
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
