export const AUTH_ENABLED = process.env.AUTH_ENABLED === "true";
export const GOOGLE_ENABLED = AUTH_ENABLED && !!process.env.AUTH_GOOGLE_ID && !!process.env.AUTH_GOOGLE_SECRET;
