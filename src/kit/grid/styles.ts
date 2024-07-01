export const aligns = {
	stretch: 'items-stretch',
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
} as const;

export const places = {
	stretch: 'justify-stretch',
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	evenly: 'justify-evenly',
} as const;

export const directions = {
	row: 'flex-row',
	column: 'flex-col',
} as const;

export const gaps = {
	collapse: '',
	dense: 'gap-1',
	normal: 'gap-4',
	sparse: 'gap-8',
} as const;

export const spans = {
	grow: 'grow',
	noGrow: 'grow-0',
	shrink: 'shrink',
	noShrink: 'shrink-0',
} as const;