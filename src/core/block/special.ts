import type { Block } from '.';

export interface ScopeBlock {
	$: 'Scope';
	body: Block[];
	initialState: {};
}

export interface FragmentBlock {
	$: 'Fragment' | '';
	body: Block[];
}

export type SpecialBlock = ScopeBlock | FragmentBlock;

const SpecialBlocks = ['Scope', '', 'Fragment'] as const;

export const isSpecialBlock = (block: Block): block is SpecialBlock =>
	SpecialBlocks.includes((block as SpecialBlock).$);