import { Prefix, Role, Suffix } from '../generated/client';

export function getRandomBoolean(probability = 0.5): boolean {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1.');
  }
  return Math.random() < probability;
}

export const getRandomRole = (roles: Role[], isStudent?: boolean) => {
  const role = roles.find((role) => role.name === 'Student');
  if (isStudent && role) return role;

  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  return randomRole;
};

export const getRandomPrefix = (prefixes: Prefix[], isStudent?: boolean) => {
  const returnPrefix = getRandomBoolean();
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  if (isStudent) return null;
  if (!returnPrefix) return null;
  return randomPrefix;
};

export const getRandomSuffix = (suffixes: Suffix[], isStudent?: boolean) => {
  const returnSuffix = getRandomBoolean(0.3);
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  if (isStudent) return null;
  if (!returnSuffix) return null;
  return randomSuffix;
};
