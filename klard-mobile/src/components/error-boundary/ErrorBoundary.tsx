import { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { lightTheme } from '@/styles';
import { typography } from '@/styles';
import { styles } from './error-boundary.styles';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // TODO: Log to Sentry or expo-error-reporter
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const colors = lightTheme; // Fallback to light theme in error state

      return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={[styles.title, typography.h2, { color: colors.foreground }]}>
            Something went wrong
          </Text>
          <Text style={[styles.message, typography.body, { color: colors.textSecondary }]}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity
            onPress={this.handleRetry}
            style={[styles.button, { backgroundColor: colors.primary }]}
            accessibilityRole="button"
            accessibilityLabel="Try again"
          >
            <Text style={[typography.button, { color: colors.primaryForeground }]}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
