import * as React from 'react';
import { PropsWithChildren } from 'react';
import { sizings } from './grid';
import { classnames, isNotNil } from 'utils';

export interface CellProps extends PropsWithChildren {
	sizing?: keyof typeof sizings;
	className?: string;
}

const Cell: React.FC<CellProps> = ({
	sizing, className,
	children,
}) => (
	<div className={classnames(
		isNotNil(sizing) ? sizings[sizing] : [],
		className,
	)}>
		{children}
	</div>
);

export default Cell;