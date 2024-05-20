import React, { ComponentProps } from 'react';

export const Kit = {
	Button: React.lazy(() => import('kit/button')),

	Row: React.lazy(() => import('kit/grid/row')),
	Column: React.lazy(() => import('kit/grid/column')),
	Cell: React.lazy(() => import('kit/grid/cell')),

	Card: React.lazy(() => import('kit/card')),

	Text: React.lazy(() => import('kit/text')),
} as const;

export type BlockId = keyof typeof Kit;

export type BlockProps<Id extends BlockId> = Omit<ComponentProps<typeof Kit[Id]>, 'onSignal'>;