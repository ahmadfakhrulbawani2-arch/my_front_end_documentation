// ./src/utils/cn.ts
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

// it is used to merge multiple className by combining all without conflict
