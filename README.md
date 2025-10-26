# @kaylabs/ts-validators

Tiny, type-safe validation library for modern TypeScript (email, phone, custom rules).

## Install
pnpm add @kaylabs/ts-validators

## Usage
```ts
import { isEmail, isPhone, compose, isNonEmpty, validateObject } from "@kaylabs/ts-validators";

console.log(isEmail("kay@example.com")); // { valid: true }
console.log(isPhone("+2348012345678"));  // { valid: true }

const rule = compose(isNonEmpty);
console.log(rule("")); // { valid: false, message: "Cannot be empty" }

type User = { name: string; email: string; phone: string };
const schema = { name: [isNonEmpty], email: [isEmail], phone: [isPhone] } as const;
const validateUser = validateObject<User>(schema);
console.log(validateUser({ name: "Kay", email: "kay@example.com", phone: "08012345678" }));
