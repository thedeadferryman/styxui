import Box, { BoxProps } from 'kit/grid/box';
import { directions } from 'kit/grid/styles';
import React from 'react';
import { classnames } from 'utils';

export interface GridProps extends BoxProps {
	direction: keyof typeof directions;
}

const Grid = React.forwardRef(({
	direction, className,
	children,
	...props
}: GridProps, ref: React.Ref<HTMLDivElement>) => (
	<Box
		{...props}
		ref={ref}
		className={classnames(
			'flex', className,
			directions[direction],
		)}
	>
		{children}
	</Box>
));

export default Grid;