export function isValidDate(value: Date | null | undefined): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function getDisplayedComponents(mode: 'date' | 'time' | 'datetime'): string {
  if (mode === 'time') return 'hourAndMinute';
  if (mode === 'datetime') return 'date';
  return 'date';
}
