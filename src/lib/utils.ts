import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10);

export const IS_ON_VERCEL = !!process.env.VERCEL_URL;
export const WEBHOOK_URL = IS_ON_VERCEL ? `https://${process.env.VERCEL_URL}/api/replicate/webhook` : `${process.env.NGROK_URL}/api/replicate/webhook`;

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};