import type { Result, Rule } from "./types.js";
import { fail, ok } from "./types.js";

export type ValidationSchema<T> = {
	[K in keyof T]?: Rule<T[K]>[];
};

export function validateObject<T>(schema: ValidationSchema<T>) {
	return (obj: T): Result => {
		for (const key in schema) {
			const rules = schema[key];
			if (!rules || rules.length === 0) continue;
			const value = obj[key];
			for (const rule of rules) {
				const res = rule(value);
				if (!res.valid) {
					return fail(`${String(key)}: ${res.message}`);
				}
			}
		}
		return ok();
	};
}
