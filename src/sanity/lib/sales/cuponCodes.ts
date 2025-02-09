export const CUPON_CODES = {
BFRIDAY: "BFRIDAY25",
XMAS2025: "XMAS2025",
NP2081: "NP2081",
} as const;

export type CuponCodes = (typeof CUPON_CODES)[keyof typeof CUPON_CODES];