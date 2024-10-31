import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const Screens: { [value: string]: string } = {
  '3xs': '16rem',
  '2xs': '24rem',
  xs: '32rem',
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  '2xl': '96rem',
  '3xl': '112rem',
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