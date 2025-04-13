import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rounded = (value: number) => {
  return Math.round(value * 100) / 100;
};

export function formatNumber(num: number, decimalPlaces: number) {
  // Round the number to the specified number of decimal places
  const multiplier = Math.pow(10, decimalPlaces);
  const roundedNum = Math.round(num * multiplier) / multiplier;
  return roundedNum.toFixed(decimalPlaces);
}
