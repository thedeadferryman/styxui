export type Nil = null | undefined;
export type Nilable<T> = T | Nil;
export type NotNil<T> = T extends Nil ? never : T;

export const isNil = <T>(value: Nilable<T>): value is Nil => (value === null || value === undefined);
export const isNotNil = <T>(value: T): value is NotNil<T> => !isNil(value);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isRecord = (value: unknown): value is Record<string, Nilable<unknown>> => (
	typeof value === 'object'
	&& isNotNil(value)
	&& Object.keys(value).every(isString)
);

export const isReadonlyArray = (value: unknown): value is readonly any[] => Array.isArray(value);

export const identity = <T>(value: T) => value;

export const pp = <T>(value: T, fmt?: string) => {
	if (isNil(fmt)) console.log(fmt, value); else console.log(value);

	return value;
};