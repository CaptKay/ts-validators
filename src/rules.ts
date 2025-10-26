import { fail, ok, type Result, type Rule } from "./types.js";

export const isNonEmpty: Rule<string> = (v) =>
	v.trim() ? ok() : fail("Cannot be empty");

export const minLength =
	(min: number): Rule<string> =>
	(v) =>
		v.length >= min ? ok() : fail(`Must be at least ${min} chars`);

export const maxLength =
	(max: number): Rule<string> =>
	(v) =>
		v.length <= max ? ok() : fail(`Must be at most ${max} chars`);

export const matches =
	(re: RegExp, message = "Invalid format"): Rule<string> =>
	(v) =>
		re.test(v) ? ok() : fail(message);

/** Compose rules (short-circuit on first failure) */
export function compose<T>(...rules: Rule<T>[]): Rule<T> {
	return (value: T): Result => {
		for (const r of rules) {
			const res = r(value);
			if (!res.valid) return res;
		}
		return ok();
	};
}
