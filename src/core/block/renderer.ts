import { Block } from 'core/block';
import React, { ComponentType } from 'react';
import { CommandExecutor, ExprEvaluator } from 'core/command';
import { BlockId, Kit } from 'kit';
import { Signal } from 'core/signals.ts';
import { isNotNil } from 'utils';

export class LayoutRenderer {
	constructor(
		private readonly evaluator: ExprEvaluator,
		private readonly executor: CommandExecutor,
	) {
	}

	render = (block: Block<BlockId>, id: string = 'tree-0'): React.ReactNode => React.createElement(
		Kit[block.$] as ComponentType<Record<string, any>>,
		this.buildFullProps(block, id),
		block.body?.map((blk, idx) => this.render(
			blk,
			[id, idx].join('-'),
		)),
	);

	private buildFullProps = (
		block: Block<BlockId>,
		id: string,
	) => ({
		...this.computeProps(block),
		...this.bindSignals(block),
		key: id,
	});

	private bindSignals = (block: Block<BlockId>) => ({
		onSignal: (signal: Signal, data: any) => {
			const command = block.bind?.[signal];
			if (isNotNil(command)) {
				this.executor.execute(command, data);
			}
		},
	});

	private computeProps = (block: Block<BlockId>) => (
		Object.fromEntries(
			Object.entries(block.props ?? {})
				.map(([key, expr]) => [key, this.evaluator.evaluate(expr)]),
		)
	);
}