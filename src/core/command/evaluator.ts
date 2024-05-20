import type { Expr, MathExpr } from 'core/command/expr';
import { get } from 'utils/object';
import { CommandExecutor } from 'core/command/executor.ts';

export interface EvalContext {
	args: unknown[];
}

export class ExprEvaluator {
	constructor(
		private state: {},
		private executor: CommandExecutor | undefined,
	) {
	}

	setExecutor = (executor: CommandExecutor) => {
		this.executor = executor;
	};

	setState = (state: {}) => {
		this.state = state;
	};

	evaluate = (expr: Expr, context: {} = {}): any => {
		switch (expr.$) {
			case 'lit':
				return expr.value;
			case 'get':
				return get(this.state, expr.path);
			case 'arr':
				return expr.items.map(ex => this.evaluate(ex));
			case 'obj':
				return Object.fromEntries(
					Object.entries(expr.props)
						.map(([key, ex]) => [key, this.evaluate(ex)]),
				);
			case 'arg':
				return get(context, expr.path);
			case 'promise':
				return Promise.resolve(expr.value);
			case 'exec':
				return this.executor?.execute(expr.body, expr.arg);
			case '-':
			case '||':
			case '&&':
			case '*':
			case '+':
				return expr.args
					.map(arg => this.evaluate(arg, context))
					.reduce((acc, cur) => this.evaluateMath(expr, acc, cur));
		}
	};

	private evaluateMath = (expr: MathExpr, left: any, right: any) => {
		switch (expr.$) {
			case '+':
				return left + right;
			case '-':
				return left - right;
			case '||':
				return left || right;
			case '&&':
				return left && right;
			case '*':
				return left * right;
		}
	};
}