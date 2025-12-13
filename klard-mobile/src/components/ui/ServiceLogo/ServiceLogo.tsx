import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, type AvatarSize } from '../Avatar';

export interface Service {
  name: string;
  logoUrl?: string;
}

export type ServiceLogoSize = Extract<AvatarSize, 'xs' | 'sm' | 'md' | 'lg'>;

export interface ServiceLogoProps {
  service: Service;
  size: ServiceLogoSize;
  style?: StyleProp<ViewStyle>;
}

export function ServiceLogo({ service, size, style }: Readonly<ServiceLogoProps>) {
  const fallback = service.name.charAt(0).toUpperCase();

  return (
    <View
      testID="service-logo-container"
      accessibilityLabel={`${service.name} logo`}
      accessibilityRole="image"
      style={style}
    >
      <Avatar
        src={service.logoUrl}
        alt={service.name}
        fallback={fallback}
        size={size}
        shape="circle"
      />
    </View>
  );
}
