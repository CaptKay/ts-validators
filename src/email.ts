import { fail, ok, type Rule } from "./types.js";

/**
 * Basic email validator.
 * Rejects obvious invalids; not a full RFC 5322 engine by design.
 */

const Email_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const isEmail: Rule<string> = (value) => {
	if (typeof value !== "string" || !value.trim()) {
		return fail("Email is required.");
	}
	return Email_RE.test(value) ? ok() : fail("Invalid email format");
};
