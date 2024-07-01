export const allowedTypes = ['time', 'date', 'text', 'number'] as const;

export type InputType = typeof allowedTypes[number];

const commonTint = (disabled: boolean) => [
	'outline-none',
	...(disabled
			? ['text-black/50']
			: []
	),
] as const;

export const tints = (disabled: boolean = false) => ({
	primary: [
		...commonTint(disabled),
		'border-primary',
		'active:border-primary/75',
		'focus:border-primary/50',
		...(disabled
				? [
					'!bg-primary/25',
					'!border-primary/25',
				]
				: []
		),
	],
	secondary: [
		...commonTint(disabled),
		'border-secondary',
		'active:border-secondary/75',
		'focus:border-secondary/50',
		...(disabled
				? [
					'!bg-secondary/25',
					'!border-secondary/25',
				]
				: []
		),
	],
	regular: [
		...commonTint(disabled),
		'border-zinc-400',
		'active:border-zinc-700',
		'focus:border-zinc-500',
		...(disabled
				? [
					'!bg-zinc-400/25',
					'!border-zinc-400/25',
				]
				: []
		),
	],
	error: [
		...commonTint(disabled),
		'border-rose-400',
		...(disabled
				? [
					'!bg-rose-400/25',
					'!border-rose-400/25',
				]
				: []
		),
	],
} as const);

export const labelTints = {
	primary: ['bg-primary text-white'],
	secondary: ['bg-secondary'],
	regular: ['bg-zinc-400 text-white'],
	error: ['bg-rose-400 text-white'],
};

export const sizes = {
	small: [
		'border-2 px-2 py-1 text-sm',
	],
	regular: [
		'border-2 px-3 py-1',
	],
	large: [
		'border-2 px-4 py-1.5 text-lg',
	],
	xl: [
		'border-2 px-4 py-2 text-xl',
	],
} as const;