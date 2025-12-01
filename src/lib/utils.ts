import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toMostSignificant(val: number, maxSigDigits: number) {
  let currentSigDigits = 1;
  let power = 10 ** currentSigDigits;
  let roundedVal = Math.round(val * power) / power;
  while (roundedVal !== val && currentSigDigits < maxSigDigits) {
    currentSigDigits += 1;
    power = 10 ** currentSigDigits;
    roundedVal = Math.round(val * power) / power;
  }
  return roundedVal;
}
