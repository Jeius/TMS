import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Screens: { [value: string]: number } = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function booleanToString(value: boolean) {
  return value ? 'true' : 'false';
}

export function stringToBoolean(value?: string | null) {
  return value?.toLowerCase() === 'true';
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}