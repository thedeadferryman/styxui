import { classnames } from 'utils';
import { PropsWithChildren } from 'react';
import { sizes, tints } from 'kit/button/styles';
import { Signal } from 'core/command/signals';


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