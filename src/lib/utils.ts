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

export function sortIds(id1: string, id2: string) {
  if (id1 === id2) {
    throw new Error("Error during id sort: ids for comparison are the same");
  }
  return id1 > id2
    ? { userId1: id1, userId2: id2 }
    : { userId1: id2, userId2: id1 };
}
