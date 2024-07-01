import * as React from 'react';
import { PropsWithChildren } from 'react';
import { classnames } from 'utils';
import { aligns, gaps, places, spans } from 'kit/grid/styles.ts';

export interface BoxProps extends PropsWithChildren {
	align?: keyof typeof aligns;
	place?: keyof typeof places;
	span?: keyof typeof spans;
	gap?: keyof typeof gaps;
	className?: string;
}

const Box = React.forwardRef(({
	align, place,
	span, gap,
	className,
	children,
}: BoxProps, ref: React.Ref<HTMLDivElement>) => {
	return (
		<div
			ref={ref}
			className={classnames(
				className,
				align && aligns[align],
				place && places[place],
				gaps[gap ?? 'normal'],
				span && spans[span],
			)}
		>
			{children}
		</div>
	);
});

export default Box;