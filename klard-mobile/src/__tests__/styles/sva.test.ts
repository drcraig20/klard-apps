// klard-mobile/src/__tests__/styles/sva.test.ts
import { sva } from '@/styles/sva';

// Mock the colors module to provide lightTheme and darkTheme
// These are the named exports that sva.ts imports
jest.mock('@/styles/colors', () => ({
  lightTheme: { primary: '#0D7C7A', background: '#FFFFFF' },
  darkTheme: { primary: '#15B5B0', background: '#0F172A' },
}));

describe('sva', () => {
  it('should return base styles', () => {
    const styles = sva({
      base: { padding: 16 },
    });

    const result = styles(false, {});
    expect(result).toContainEqual({ padding: 16 });
  });

  it('should apply light theme colors', () => {
    const styles = sva({
      base: (colors) => ({ backgroundColor: colors.primary }),
    });

    const result = styles(false, {});
    expect(result).toContainEqual({ backgroundColor: '#0D7C7A' });
  });

  it('should apply dark theme colors', () => {
    const styles = sva({
      base: (colors) => ({ backgroundColor: colors.primary }),
    });

    const result = styles(true, {});
    expect(result).toContainEqual({ backgroundColor: '#15B5B0' });
  });

  it('should apply variant styles', () => {
    const styles = sva({
      variants: {
        size: {
          sm: { padding: 8 },
          lg: { padding: 24 },
        },
      },
    });

    const result = styles(false, { size: 'lg' });
    expect(result).toContainEqual({ padding: 24 });
  });

  it('should apply default variants', () => {
    const styles = sva({
      variants: {
        size: {
          sm: { padding: 8 },
          lg: { padding: 24 },
        },
      },
      defaultVariants: { size: 'sm' },
    });

    const result = styles(false, {});
    expect(result).toContainEqual({ padding: 8 });
  });

  it('should apply themed variant styles', () => {
    const styles = sva({
      variants: {
        variant: {
          primary: (colors) => ({ backgroundColor: colors.primary }),
        },
      },
    });

    const lightResult = styles(false, { variant: 'primary' });
    const darkResult = styles(true, { variant: 'primary' });

    expect(lightResult).toContainEqual({ backgroundColor: '#0D7C7A' });
    expect(darkResult).toContainEqual({ backgroundColor: '#15B5B0' });
  });

  it('should apply compound variants', () => {
    const styles = sva({
      variants: {
        variant: {
          primary: { backgroundColor: 'blue' },
        },
        size: {
          lg: { padding: 24 },
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          size: 'lg',
          style: { fontWeight: 'bold' },
        },
      ],
    });

    const result = styles(false, { variant: 'primary', size: 'lg' });
    expect(result).toContainEqual({ fontWeight: 'bold' });
  });
});