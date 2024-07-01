import React from 'react';
import { classnames } from 'utils';

const tints = {
	primary: 'text-primary',
	secondary: 'text-secondary',
	regular: '',
	error: 'text-rose-600',
} as const;

const sizes = {
	small: 'text-sm',
	regular: '',
	large: 'text-lg',
	xl: 'text-xl',
	xxl: 'text-4xl',
};

export interface TextProps {
	text: string;
	tint?: keyof typeof tints;
	size?: keyof typeof sizes;
	className?: string;
}

const Text: React.FC<TextProps> = ({
	text,
	tint, size,
	className,
}) => (
	<span
		className={classnames(
			className,
			tints[tint ?? 'regular'],
			sizes[size ?? 'regular'],
		)}
	>
		{text}
	</span>
);

export default Text;