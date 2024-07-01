import { isNotNil, Nil } from 'utils';

export const views = ['pages', 'config'] as const;
export type ViewKey = typeof views[number];

export const isViewKey = (value: string): value is ViewKey =>
	views.includes(value as ViewKey);

export const asViewKey = (value: string | Nil, fallback: ViewKey) =>
	(isNotNil(value) && isViewKey(value)) ? value : fallback;