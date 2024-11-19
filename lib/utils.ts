import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMaxNumber(array: number[]) {
  return !array.length ? 0 : Math.max(...array);
}

export function toReadableDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA").format(date);
}

export const MY_FAVORITES = "myFavorites";
