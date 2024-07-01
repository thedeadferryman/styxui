import { isNil, isNotNil } from 'utils/common';

const getPath = (value: any, path: string[]): any => {
	if (isNil(value)) return undefined;
	if (path.length < 1) return value;

	const [current, ...rest] = path;

	if (Array.isArray(value)) {
		const idx = Number.parseInt(current, 10);

		if (Number.isFinite(idx)) {
			return getPath(value[idx], rest);
		}

		return undefined;
	} else {
		return getPath(value[current], rest);
	}
};

export const get = (value: any, path?: string) => (
	isNotNil(path) ? getPath(value, path.split('.')) : value
);

const isIntLike = (value: string) => (
	Number.isFinite(Number.parseInt(value, 10))
);

export const setPath = (obj: any, path: string[], value: any) => {
	if (path.length < 1) return value;

	const [current, ...rest] = path;

	let nextObj = obj;

	if (isIntLike(current)) {
		const idx = Number.parseInt(current, 10);

		if (isNil(nextObj)) {
			nextObj = [];
		}

		if (Array.isArray(nextObj)) {
			nextObj = [...obj];
			nextObj[idx] = setPath(nextObj[idx], rest, value);
		}
	} else {
		if (isNil(nextObj)) {
			nextObj = {};
		} else {
			nextObj = { ...nextObj };
		}

		nextObj[current] = setPath(nextObj[current], rest, value);
	}

	return nextObj;
};

export const set = (obj: any, path: string, value: any) => (
	setPath(obj, asPath(path), value)
);

export const asPath = (path: string) => path.split('.');

export const isSubpath = (path: string, subpath: string) => (
	(subpath.substring(0, path.length) === path && subpath[path.length] === '.')
	|| path === subpath
);

export const relativeTo = (path: string, basis: string) => (
	isSubpath(basis, path) ? path.substring(basis.length) : path
);
