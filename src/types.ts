export type Ok = { valid: true };
export type Fail = { valid: false; message: string };
export type Result = Ok | Fail;

export type Rule<T> = (value: T) => Result;

export function ok(): Ok {
	return { valid: true };
}

export function fail(message: string): Fail {
	return { valid: false, message };
}
