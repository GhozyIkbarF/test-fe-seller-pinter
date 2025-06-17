import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(dateString: string, options?: string): string {
  const formatted = format(new Date(dateString), options ? options : "MMMM dd, yyyy HH:mm:ss");
  return formatted;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const getCookie = () => Cookies.get("token");
export const setCookie = (value: string) => Cookies.set("token", value);
export const removeCookie = () => Cookies.remove("token");