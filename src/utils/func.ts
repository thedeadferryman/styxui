import { isNotNil } from 'utils/common.ts';

export const debounce = <Args extends any[]>(
	func: (...args: Args) => void,
	time: number,
) => {
	let timer: number | NodeJS.Timeout | undefined;

	return (...args: Args) => {
		if (isNotNil(timer)) clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, time);
	};
};