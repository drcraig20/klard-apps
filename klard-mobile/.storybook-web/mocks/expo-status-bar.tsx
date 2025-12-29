/**
 * expo-status-bar mock for Storybook web environment
 *
 * No-op implementation since status bar is controlled by the browser.
 */

import React from 'react';

export type StatusBarStyle = 'auto' | 'inverted' | 'light' | 'dark';

export interface StatusBarProps {
  style?: StatusBarStyle;
  hidden?: boolean;
  animated?: boolean;
  backgroundColor?: string;
  translucent?: boolean;
  networkActivityIndicatorVisible?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = () => {
  // No-op on web - status bar is controlled by the browser
  return null;
};

export function setStatusBarStyle(_style: StatusBarStyle, _animated?: boolean): void {
  // No-op on web
}

export function setStatusBarHidden(_hidden: boolean, _animation?: 'none' | 'fade' | 'slide'): void {
  // No-op on web
}

export function setStatusBarBackgroundColor(_backgroundColor: string, _animated?: boolean): void {
  // No-op on web
}

export function setStatusBarTranslucent(_translucent: boolean): void {
  // No-op on web
}

export function setStatusBarNetworkActivityIndicatorVisible(_visible: boolean): void {
  // No-op on web
}

export default {
  StatusBar,
  setStatusBarStyle,
  setStatusBarHidden,
  setStatusBarBackgroundColor,
  setStatusBarTranslucent,
  setStatusBarNetworkActivityIndicatorVisible,
};
