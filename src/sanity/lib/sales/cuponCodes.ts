export const CUPON_CODES = {
BFRIDAY: "BFRIDAY",
XMAS2025: "XMAS2025",
NP2081: "NP2081",
} as const;

export type CuponCode= keyof typeof CUPON_CODES;