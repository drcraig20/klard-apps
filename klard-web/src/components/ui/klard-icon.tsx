import Image from 'next/image';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface KlardIconProps {
  size?: IconSize;
  className?: string;
  priority?: boolean;
}

const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
  '2xl': 96,
};

export function KlardIcon({
  size = 'md',
  className = '',
  priority = false
}: KlardIconProps): React.ReactElement {
  const dimension = sizeMap[size];

  return (
    <Image
      src="/icons/icon-192.png"
      alt="Klard"
      width={dimension}
      height={dimension}
      className={className}
      priority={priority}
    />
  );
}

export function KlardLogo({
  className = ''
}: {
  className?: string
}): React.ReactElement {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <KlardIcon size="md" priority />
      <span className="font-semibold text-xl text-primary">Klard</span>
    </div>
  );
}
