import { BlockId, Kit } from 'kit';
import { Signal } from 'core/signals.ts';
import { Command, Expr } from 'core/command';
import { ComponentProps } from 'react';

type SignalBinding = {
	[sig in Signal]?: Command;
}

export interface Block<Id extends BlockId = BlockId> {
	$: Id;
	props?: Record<string, Expr>;
	body?: Block[];
	bind?: SignalBinding;
}

type DirectBlockProps<Id extends BlockId> = ComponentProps<typeof Kit[Id]>;
export type BlockProps<Id extends BlockId> = {
	[id in keyof DirectBlockProps<Id>]: Expr;
};

export * from './renderer';