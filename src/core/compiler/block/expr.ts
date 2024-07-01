import { Expr, MathExpr, ObjectExpr } from 'core/command';
import { escapeQuotes } from 'core/compiler/block/helpers.ts';
import { wtf } from 'utils';

class ExprCompiler {
	constructor() {
	}

	compile = (expr: Expr): string => {
		switch (expr.$) {
			case 'lit':
				return JSON.stringify(expr.value);
			case 'get':
				return `get(state, '${expr.path}')`;
			case 'arr':
				return '[' + expr.items.map(el => this.compile(el)).join(', ') + ']';
			case 'obj':
				return this.compileObj(expr);
			case 'arg':
				return `get(context, '${expr.path}')`;
			case 'promise':
				return `Promise.resolve(${this.compile(expr.value)})`;
			case '+':
			case '-':
			case '||':
			case '&&':
			case '*':
				return expr.args
					.map(arg => this.compile(arg))
					.reduce((acc, cur) => this.compileMath(expr.$, acc, cur));
			case 'exec':
				return '(/*exec*/ undefined)';
			case 'eval':
				return '(/*eval*/ undefined)';
			default:
				return wtf(expr);
		}
	};

	private compileMath = (op: MathExpr['$'], left: string, right: string) => (
		'(' + left + op + right + ')'
	);

	private compileObj = (expr: ObjectExpr): string => (
		'({' +
		Object
			.entries(expr.props)
			.map(([key, value]) => (
				[escapeQuotes(key), this.compile(value)].join(' : ')
			))
			.join(', ')
		+ '})'
	);
}

export default ExprCompiler;