import { describe, expect, test } from "vitest";
import {
	compose,
	isEmail,
	isNonEmpty,
	isPhone,
	matches,
	maxLength,
	minLength,
	type ValidationSchema,
	validateObject,
} from "../src/index.js";

describe("email", () => {
	test("accepts valid emails", () => {
		expect(isEmail("kay@example.com").valid).toBe(true);
	});

	test("rejects invalid emails", () => {
		expect(isEmail("not-an-email").valid).toBe(false);
	});
});

describe("phone", () => {
	test("accepts valid E.164-like numbers", () => {
		expect(isPhone("+2348012345678").valid).toBe(true);
		expect(isPhone("08012345678").valid).toBe(true);
	});

	test("rejects invalid", () => {
		expect(isPhone("123").valid).toBe(false);
		expect(isPhone("+12-34").valid).toBe(false);
	});
});

describe("custom rules", () => {
	test("compose passes when all pass", () => {
		const rule = compose(isNonEmpty, minLength(3), maxLength(10));
		expect(rule("hello").valid).toBe(true);
	});
	test("compose short-circuits on first failure", () => {
		const rule = compose(isNonEmpty, minLength(5), maxLength(10));
		const res = rule("hey");
		expect(res.valid).toBe(false);
		if (!res.valid) expect(res.message).toContain("at least 5");
	});
	test("matches custom regex", () => {
		const onlyDigits = matches(/^\d+$/, "digits only");
		expect(onlyDigits("123").valid).toBe(true);
		expect(onlyDigits("12a").valid).toBe(false);
	});
});

describe("object schema", () => {
	type User = { name: string; email: string; phone: string };
	const schema: ValidationSchema<User> = {
		name: [isNonEmpty, minLength(2)],
		email: [isEmail],
		phone: [isPhone],
	};
	const validateUser = validateObject<User>(schema);

	test("valid user passes", () => {
		expect(
			validateUser({
				name: "Kay",
				email: "kay@example.com",
				phone: "08012345678",
			}).valid,
		).toBe(true);
	});
	test("invalid user fails with field context", () => {
		const res = validateUser({ name: "k", email: "bad@", phone: "x" });
		expect(res.valid).toBe(false);
		if (!res.valid) expect(res.message).toMatch(/(name|email|phone):/);
	});
});
