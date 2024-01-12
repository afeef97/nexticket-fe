import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//eslint-disable-next-line
export async function handleAsyncQuery(query: (...args: any[]) => Promise<any>) {
  try {
    const response = await query()
    return {
      ok: true,
      data: response,
    }
  } catch (error) {
    return {
      ok: false,
      data: error,
    }
  }
}