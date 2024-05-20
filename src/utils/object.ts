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

const setPath = (obj: any, path: string[], value: any) => {
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
			nextObj[idx] = setPath(obj[idx], rest, value);
		}
	} else {
		if (isNil(nextObj)) {
			nextObj = {};
		} else {
			nextObj = { ...nextObj };
		}

		nextObj[current] = setPath(obj[current], rest, value);
	}

	return nextObj;
};

export const set = (obj: any, path: string, value: any) => (
	setPath(obj, path.split('.'), value)
);