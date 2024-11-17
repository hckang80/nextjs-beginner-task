import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMaxNumber(array: number[]) {
  return Math.max(...array);
}

export function getValueByPath(obj: Record<string, any>, path: string) {
  if (!obj || typeof obj !== "object" || typeof path !== "string") {
    throw new Error("Invalid arguments");
  }

  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}
