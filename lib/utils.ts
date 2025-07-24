import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, options?: string): string {
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

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export function pathToRegex(path: string) {
  const regex = path
    .replace(/:[^/]+/g, "[^/]+")
    .replace(/\//g, "\\/");

  return new RegExp(`^${regex}$`);
}

const isBrowser = typeof window !== "undefined";

export const storage = {
  set: (key: string, value: any) => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      
    }
  },

  get: <T>(key: string): T | null => {
    if (!isBrowser) return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      return null;
    }
  },

  remove: (key: string) => {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
    }
  },

  clear: () => {
    if (!isBrowser) return;
    try {
      window.localStorage.clear();
    } catch (error) {
    }
  },
};


export const getCookie = () => Cookies.get("token");
export const setCookie = (value: string) => Cookies.set("token", value);
export const removeCookie = () => Cookies.remove("token");