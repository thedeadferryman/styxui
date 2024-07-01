import { ComponentProps } from 'react';
import { Kit, KitBlockId } from 'kit';
import { Command, Expr } from 'core/command';
import { isSpecialBlock, SpecialBlock } from './special';
import { get } from 'utils/object.ts';
import { isString } from 'utils';
import { Signal } from 'core/command/signals';

type SignalBinding = {
	[sig in Signal]?: Command;
}

export interface KitBlock<Id extends KitBlockId = KitBlockId> {
	$: Id;
	props?: Record<string, Expr>;
	body?: Block[];
	bind?: SignalBinding;
}

export type Block = KitBlock | SpecialBlock;

export const isKitBlock = (block: Block): block is KitBlock => Object.keys(Kit).includes(block.$);

export const isBlock = (value: unknown): value is Block => (
	isString(get(value, '$')) && (
		isKitBlock(value as Block) || isSpecialBlock(value as Block)
	)
);

type DirectBlockProps<Id extends KitBlockId> = ComponentProps<typeof Kit[Id]>;

export type BlockProps<Id extends KitBlockId> = {
	[id in keyof DirectBlockProps<Id>]: Expr;
};

export * from './renderer';
export { default as RenderedBlock } from './block';