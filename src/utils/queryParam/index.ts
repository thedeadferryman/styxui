import { useMemo } from 'react';
import { isNil, isString } from 'utils/common.ts';
import { compact } from 'utils/array.ts';

export const useQueryParams = () => {
	const searchString = window.location.search;

	return useMemo(() => {
		const kvPairs = searchString
			.replace(/^\?/, '')
			.split('&')
			.map(pair => pair.split('=', 2))
		;

		const params: Record<string, string | string[] | undefined> = {};

		for (const [key, value] of kvPairs) {
			if (key.endsWith('[]')) {
				const arrKey = key.trim().replace(/\[]$/, '');
				const oldVal = params[arrKey];
				params[arrKey] = (isNil(oldVal) ? [value] : (
					isString(oldVal)
						? [oldVal, value]
						: [...oldVal, value]
				));
			}

			params[key] = value;
		}

		return params;
	}, [searchString]);

};

export function useQueryParam(key: string): string | string[] | undefined;
export function useQueryParam(key: string, options: { as: 'array' }): string[] | undefined;
export function useQueryParam(key: string, options: { as: 'string' }): string | undefined;
export function useQueryParam<T>(key: string, options: { as: (value: string | string[] | undefined) => T }): T;

export function useQueryParam(key: string, { as }: {
	as?: 'array' | 'string' | ((value: string | string[] | undefined) => unknown)
} = {}) {
	const params = useQueryParams();

	const rawParam = useMemo(() => params[key], [params, key]);

	return useMemo(() => {
		switch (as) {
			case 'array':
				return Array.isArray(rawParam) ? rawParam : compact([rawParam]);
			case 'string':
				return Array.isArray(rawParam) ? rawParam[0] : rawParam;
			default:
				return (typeof as === 'function')
					? as(rawParam)
					: rawParam;
		}
	}, [rawParam, as]);
}