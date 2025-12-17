import appConfig from '../../app.json';

describe('Face ID Permission Configuration', () => {
  it('should have NSFaceIDUsageDescription configured in iOS infoPlist', () => {
    expect(appConfig.expo.ios.infoPlist).toBeDefined();
    expect(appConfig.expo.ios.infoPlist.NSFaceIDUsageDescription).toBeDefined();
  });

  it('should have appropriate Face ID permission message', () => {
    const message = appConfig.expo.ios.infoPlist.NSFaceIDUsageDescription;
    expect(message).toBe('Klard uses Face ID for secure passwordless login');
  });

  it('should have message that explains the purpose of Face ID usage', () => {
    const message = appConfig.expo.ios.infoPlist.NSFaceIDUsageDescription;

    // Verify message contains key terms explaining the usage
    expect(message.toLowerCase()).toContain('face id');
    expect(message.toLowerCase()).toContain('secure');
    expect(message.toLowerCase()).toContain('login');
  });
});

/**
 * MANUAL VERIFICATION CHECKLIST (AUTH-012-02)
 *
 * These items must be verified manually on an iOS device or simulator:
 *
 * 1. [ ] iOS shows permission prompt on first biometric authentication attempt
 *    - Run the app on iOS device/simulator with Face ID capability
 *    - Navigate to passkey registration or sign-in flow
 *    - Trigger biometric authentication
 *    - Verify system prompt appears with configured message
 *
 * 2. [ ] Permission description matches configured message
 *    - Verify the prompt displays: "Klard uses Face ID for secure passwordless login"
 *
 * 3. [ ] App handles permission denied gracefully
 *    - When prompt appears, tap "Don't Allow"
 *    - Verify app shows appropriate error message
 *    - Verify app doesn't crash or hang
 *    - Verify user can continue using other auth methods
 *
 * 4. [ ] Expo prebuild regenerates Info.plist correctly
 *    - Run: npx expo prebuild --platform ios
 *    - Verify ios/klard/Info.plist contains NSFaceIDUsageDescription
 *    - Verify the value matches app.json configuration
 *
 * TESTING NOTES:
 * - iOS Simulator: Use Features > Face ID > Enrolled to enable Face ID
 * - iOS Device: Must have Face ID capability (iPhone X or later)
 * - Permission prompt only appears once; to test again, reset Settings > Privacy > Face ID
 */
