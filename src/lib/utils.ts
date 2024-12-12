import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const textToNumVal = (
    textOrEvent: string | React.ChangeEvent<HTMLInputElement>,
) => {
    const text =
        typeof textOrEvent === "string"
            ? textOrEvent
            : textOrEvent.target.value;

    const replaced = text.replace(",", ".").replace(/[^0-9.]/g, "");

    if (replaced === "") return "";

    if (replaced.endsWith(".")) return replaced as unknown as number;

    const value =
        !isNaN(Number(replaced)) && text !== "" ? Number(replaced) : "";

    return value;
};
