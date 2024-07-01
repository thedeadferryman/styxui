import React from 'react';
import { Block } from 'core/block';
import { CommandExecutor, ExprEvaluator, ProcedureCaller } from 'core/command';
import { BasicLayoutRenderer } from './basic';

export interface LayoutRenderer {
	render: (block: Block, id?: string) => React.ReactNode;
}

export const createRenderer = (
	evaluator: ExprEvaluator,
	executor: CommandExecutor,
	caller: ProcedureCaller,
): LayoutRenderer => new BasicLayoutRenderer(evaluator, executor, caller);