/*
 * Copyright 2024 Karl F. Meinkopf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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