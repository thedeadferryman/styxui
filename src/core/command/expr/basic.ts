import { get } from 'utils/object';
import { CommandExecutor } from 'core/command/executor';
import type { EvalExpr, Expr, MathExpr } from './expr';
import { ExprEvaluator } from 'core/command/expr/index.ts';
import { wtf } from 'utils';

export class BasicExprEvaluator implements ExprEvaluator {
	constructor(
		private state: {},
		private executor?: CommandExecutor,
	) {
	}

	setState = (state: {}) => {
		this.state = state;
	};

	setExecutor = (executor: CommandExecutor) => {
		this.executor = executor;
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
			case 'eval':
				return this.evaluateEval(expr, context);
			default:
				return wtf(expr);
		}
	};

	private evaluateEval = (expr: EvalExpr, context: any) => (
		STYXUI_SAFE_EVAL(`(function (evalState, evalContext) {${expr.code})`)(get(this.state, undefined), context)
	);

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