import * as React from 'react';
import { PropsWithChildren } from 'react';
import { classnames, isNotNil } from 'utils';

const aligns = {
	stretch: 'items-stretch',
	start: 'items-start',
	center: 'items-center',
	end: 'items-end',
} as const;

const places = {
	stretch: 'justify-stretch',
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	evenly: 'justify-evenly',
} as const;

const directions = {
	row: 'flex-row',
	column: 'flex-col',
} as const;

const spacings = {
	dense: 'gap-1',
	normal: 'gap-4',
	sparse: 'gap-8',
} as const;

export const sizings = {
	grow: 'grow',
	noGrow: 'grow-0',
	shrink: 'shrink',
	noShrink: 'shrink-0',
} as const;

export interface GridProps extends PropsWithChildren {
	align?: keyof typeof aligns;
	place?: keyof typeof places;
	direction: keyof typeof directions;
	sizing?: keyof typeof sizings;
	spacing?: keyof typeof spacings;
}

export const Grid: React.FC<GridProps> = ({
	direction,
	align, place,
	sizing, spacing,
	children,
}) => {
	return (
		<div className={classnames(
			'flex',
			aligns[align ?? 'start'],
			places[place ?? 'start'],
			spacings[spacing ?? 'normal'],
			directions[direction],
			isNotNil(sizing) ? sizings[sizing] : [],
		)}>
			{children}
		</div>
	);
};