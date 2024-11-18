import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMaxNumber(array: number[]) {
  return Math.max(...array);
}

export function toReadableDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA").format(date);
}
