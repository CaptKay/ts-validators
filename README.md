<div align="center">
  <img src="https://raw.githubusercontent.com/CaptKay/ts-validators/main/.github/banner.png" alt="@captkay/ts-validators banner" width="800" />
  <h1>@captkay/ts-validators</h1>
  <p><strong>Tiny, type-safe validation library for modern TypeScript</strong></p>

  <a href="https://github.com/CaptKay/ts-validators/actions"><img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/CaptKay/ts-validators/ci.yml?branch=main"></a>
  <a href="https://github.com/CaptKay/ts-validators/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
  <a href="https://www.npmjs.com/package/@captkay/ts-validators"><img alt="npm version" src="https://img.shields.io/npm/v/@captkay/ts-validators"></a>
</div>

---

### 🚀 Overview

`@captkay/ts-validators` provides simple, composable validation helpers for email, phone, and custom rules — with full TypeScript type inference.

### ✨ Features
- ✅ Tiny, framework-agnostic, zero dependencies  
- 🔒 Type-safe validation results (`Result<T, E>`)  
- 🧩 Extendable with your own custom rules  
- 🧪 Tested with [Vitest](https://vitest.dev)  
- 📦 Works in Node 22+ or modern browsers (ESM)

---

### 📦 Installation

```bash
pnpm add @captkay/ts-validators
# or
npm install @captkay/ts-validators

import { isEmail, isPhone, compose, validateObject } from "@captkay/ts-validators";

console.log(isEmail("kay@example.com")); // { valid: true }

const schema = {
  name: [v => v.trim() ? { valid: true } : { valid: false, message: "Required" }],
  email: [isEmail],
  phone: [isPhone]
};

const validateUser = validateObject(schema);
const result = validateUser({ name: "Kay", email: "kay@example.com", phone: "08012345678" });
console.log(result); // { ok: true, value: { ... } }


#🧠 Usage

import { isEmail, isPhone, compose, validateObject } from "@captkay/ts-validators";

console.log(isEmail("kay@example.com")); // { valid: true }

const schema = {
  name: [v => v.trim() ? { valid: true } : { valid: false, message: "Required" }],
  email: [isEmail],
  phone: [isPhone]
};

const validateUser = validateObject(schema);
const result = validateUser({ name: "Kay", email: "kay@example.com", phone: "08012345678" });
console.log(result); // { ok: true, value: { ... } }

#🧪 Running Tests
pnpm run test

#🛠️ Development
pnpm run typecheck
pnpm run build
pnpm run check