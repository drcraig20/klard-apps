export interface PasswordStrength {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  feedback: string[];
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return { score: 0, level: 'weak', feedback: ['Enter a password'] };
  }

  // Length: max 25 points
  if (password.length >= 8) {
    score += 15;
    if (password.length >= 12) {
      score += 10;
    }
  } else {
    feedback.push('Use at least 8 characters');
  }

  // Lowercase: 15 points
  if (/[a-z]/.test(password)) {
    score += 15;
  } else {
    feedback.push('Add a lowercase letter');
  }

  // Uppercase: 20 points
  if (/[A-Z]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add an uppercase letter');
  }

  // Numbers: 20 points
  if (/[0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add a number');
  }

  // Special characters: 20 points
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 20;
  } else {
    feedback.push('Add a special character');
  }

  // Determine level
  let level: PasswordStrength['level'];
  if (score < 30) {
    level = 'weak';
  } else if (score < 60) {
    level = 'fair';
  } else if (score < 80) {
    level = 'good';
  } else {
    level = 'strong';
  }

  return { score, level, feedback };
}