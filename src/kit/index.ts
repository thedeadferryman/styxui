import React, { ComponentProps } from 'react';

export const Kit = {
	Button: React.lazy(() => import('kit/button')),

	Input: React.lazy(() => import('kit/input')),

	Row: React.lazy(() => import('kit/grid/row')),
	Column: React.lazy(() => import('kit/grid/column')),
	Box: React.lazy(() => import('kit/grid/box')),

	Card: React.lazy(() => import('kit/card')),

	Text: React.lazy(() => import('kit/text')),
} as const;

export type KitBlockId = keyof typeof Kit;

export type BlockProps<Id extends KitBlockId> = Omit<ComponentProps<typeof Kit[Id]>, 'onSignal'>;