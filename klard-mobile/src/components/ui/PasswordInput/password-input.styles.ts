import { StyleSheet } from 'react-native';

// ============================================================================
// Color Constants
// ============================================================================

export const inputColors = {
  primary: '#0D7C7A',
  error: '#DC2626',
  border: '#CBD5E1',
  placeholder: '#94A3B8',
  icon: '#64748B',
  text: '#0F172A',
  textSecondary: '#475569',
  background: '#FFFFFF',
  backgroundDisabled: '#F1F5F9',
};

// ============================================================================
// Input Styles
// ============================================================================

export const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: inputColors.textSecondary,
    marginBottom: 8,
  },
  labelDisabled: {
    opacity: 0.5,
  },
  required: {
    color: inputColors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: inputColors.background,
    borderRadius: 12,
    height: 48,
  },
  inputContainerDisabled: {
    backgroundColor: inputColors.backgroundDisabled,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: inputColors.text,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  inputDisabled: {
    color: inputColors.icon,
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: inputColors.error,
    marginTop: 8,
  },
  helperText: {
    fontSize: 14,
    color: inputColors.textSecondary,
    marginTop: 8,
  },
});

// ============================================================================
// Strength Indicator Styles
// ============================================================================

export const strengthStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 4,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 3,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
  feedback: {
    fontSize: 12,
  },
});

// ============================================================================
// Requirements List Styles
// ============================================================================

export const reqStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 13,
  },
});
