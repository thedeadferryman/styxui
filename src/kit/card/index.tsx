import * as React from 'react';
import { ReactNode, useMemo } from 'react';
import { classnames } from 'utils';
import { Box, BoxProps } from 'kit/grid';

const tints = {
	primary: {
		card: 'border-primary',
		title: 'bg-primary text-white',
	},
	secondary: {
		card: 'border-secondary',
		title: 'bg-secondary text-white',
	},
	regular: {
		card: 'border-slate-400',
		title: 'bg-slate-400 text-white',
	},
} as const;

export interface CardProps extends BoxProps {
	tint?: keyof typeof tints;
	title: string;
	footer?: ReactNode;
}

const Card: React.FC<CardProps> = ({
	tint,
	title,
	children,
	footer,
	className,
	...props
}) => {
	const tintStyle = useMemo(() => tints[tint ?? 'primary'], [tint]);

	return (
		<Box
			{...props}
			className={classnames(
				className,
				'flex flex-col items-stretch',
				'border-2',
				tintStyle.card,
			)}
		>
			<div className={'flex flex-row justify-start'}>
				<span className={classnames(
					'-translate-y-1/2',
					'ml-6 px-2.5',
					'text-lg',
					tintStyle.title,
				)}>
					{title}
				</span>
			</div>
			<div className={'grow p-4 pt-1'}>
				{children}
			</div>
			{footer && (
				<div className={''}>
					{footer}
				</div>
			)}
		</Box>
	);
};

export default Card;