import React, { ComponentType } from 'react';
import { CommandExecutor, ExprEvaluator, ProcedureCaller } from 'core/command';
import { Signal } from 'core/command/signals';
import { Block, isKitBlock, KitBlock, RenderedBlock } from 'core/block';
import { isSpecialBlock, ScopeBlock, SpecialBlock } from 'core/block/special';
import { isNotNil, wtf } from 'utils';
import { Kit } from 'kit';
import type { LayoutRenderer } from '.';

export class BasicLayoutRenderer implements LayoutRenderer {
	// private blockProps: Map<string, BlockProps<BlockId>>;

	constructor(
		private readonly evaluator: ExprEvaluator,
		private readonly executor: CommandExecutor,
		private readonly caller: ProcedureCaller,
	) {
		// this.blockProps = new Map();
	}

	render = (
		block: Block,
		id: string = 'tree',
	): React.ReactNode => {
		if (isSpecialBlock(block)) {
			return this.renderSpecial(block, id);
		}
		if (isKitBlock(block)) {
			return this.renderKit(block, id);
		}
	};

	private renderSpecial = (
		block: SpecialBlock, id: string,
	): React.ReactNode => {
		switch (block.$) {
			case 'Scope':
				return this.renderScope(block);
			case '':
			case 'Fragment':
				return block.body.map((blk, i) => this.render(blk, `${id}:${i}`));
			default:
				return wtf(block);
		}
	};

	private renderScope(block: ScopeBlock) {
		return React.createElement(
			RenderedBlock,
			{
				initialState: block.initialState,
				layout: {
					$: 'Fragment',
					body: block.body,
				},
				caller: this.caller,
			},
		);
	}

	private renderKit = (
		block: KitBlock, id: string,
	): React.ReactNode => React.createElement(
		Kit[block.$] as ComponentType<Record<string, any>>,
		this.buildFullProps(block, id),
		block.body?.map((blk, idx) => this.render(
			blk,
			[id, idx].join(':'),
		)),
	);

	private buildFullProps = (
		block: KitBlock,
		id: string,
	) => ({
		...this.computeProps(block),
		...this.bindSignals(block),
		key: id,
	});

	private bindSignals = (block: KitBlock) => ({
		onSignal: (signal: Signal, data: any) => {
			const command = block.bind?.[signal];
			if (isNotNil(command)) {
				this.executor.execute(command, data);
			}
		},
	});

	private computeProps = (block: KitBlock) => (
		Object.fromEntries(
			Object.entries(block.props ?? {})
				.map(([key, expr]) => [key, this.evaluator.evaluate(expr)]),
		)
	);
}