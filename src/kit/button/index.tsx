import { classnames } from 'utils';
import { Signal } from 'core/signals.ts';
import { PropsWithChildren } from 'react';

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

const commonTint = (disabled: boolean) => [
	'active:border-transparent',
	...(disabled
			? ['text-black/50']
			: []
	),
] as const;

export const tints = (disabled: boolean = false) => ({
	primary: [
		...commonTint(disabled),
		'border-primary',
		'hover:bg-primary',
		'active:bg-primary/75',
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
		'hover:bg-secondary',
		'active:bg-secondary/75',
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
		'hover:bg-zinc-400',
		'active:bg-zinc-400/75',
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
		'hover:bg-rose-400',
		'active:bg-rose-400/75',
		...(disabled
				? [
					'!bg-rose-400/25',
					'!border-rose-400/25',
				]
				: []
		),
	],
} as const);


export interface ButtonProps extends PropsWithChildren {
	tint?: keyof ReturnType<typeof tints>;
	size?: keyof typeof sizes;
	disabled?: boolean;

	className?: string;
	onSignal: (signal: Signal) => unknown;
}

export const Button = ({
	tint, size, disabled,
	className, children,
	onSignal,
}: ButtonProps) => (
	<button
		disabled={disabled}
		className={classnames(
			className,
			'font-display',
			'cursor-pointer',
			'transition-all',
			'bg-transparent',
			tints(disabled)[tint ?? 'regular'],
			sizes[size ?? 'regular'],
		)}
		onClick={() => onSignal('click')}
	>
		{children}
	</button>
);

export default Button;