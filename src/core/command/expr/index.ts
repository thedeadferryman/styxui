import { CommandExecutor } from 'core/command/executor';
import type { Expr } from './expr';
import { BasicExprEvaluator } from './basic';

export interface ExprEvaluator {
	setState: (state: {}) => void;
	setExecutor: (executor: CommandExecutor) => void;
	evaluate: (expr: Expr, context?: {}) => any;
}

export const createEvaluator = (
	state: {},
) => new BasicExprEvaluator(state);

export * from './expr';