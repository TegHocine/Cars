import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isNumber = (v: string | number) =>
  (typeof v === "number" && v - v === 0) ||
  (typeof v === "string" && Number.isFinite(+v) && v.trim() !== "")

export const saveToLocalStorage = (key: string, value: unknown): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
  }
}

export const getFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : undefined
  } catch (error) {
    console.error("Failed to retrieve from localStorage:", error)
    return undefined
  }
}

export const removeFromLocalStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error("Failed to remove from localStorage:", error)
  }
}
