import { fail, ok, type Rule } from "./types.js";

/**
 * E.164-ish phone validator:
 * - Optional leading '+'
 * - 8–15 digits (typical MSISDN length range)
 * Adjust to your locale if needed.
 */

const PHONE_RE = /^\+?\d{8,15}$/;

export const isPhone: Rule<string> = (value) => {
	if (typeof value !== "string" || !value.trim()) {
		return fail("Phone is required.");
	}
	return PHONE_RE.test(value) ? ok() : fail("Invalid phone format");
};
