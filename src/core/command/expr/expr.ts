import { Command } from 'core/command/command.ts';

export interface LiteralExpr {
	$: 'lit';
	value: string | number | boolean;
}

export interface GetExpr {
	$: 'get';
	path: string | undefined;
}

export interface ArrayExpr {
	$: 'arr';
	items: Expr[];
}

export interface ObjectExpr {
	$: 'obj';
	props: Record<string, Expr>;
}

export interface ArgExpr {
	$: 'arg';
	path: string | undefined;
}

export interface PromiseExpr {
	$: 'promise';
	value: Expr;
}

export interface MathExpr {
	$: '+' | '-' | '||' | '&&' | '*';
	args: Expr[];
}

export interface ExecExpr {
	$: 'exec';
	body: Command;
	arg?: Expr;
}

export interface EvalExpr {
	$: 'eval';
	code: string;
}

export type Expr = LiteralExpr | GetExpr | ArrayExpr | ObjectExpr | ArgExpr | PromiseExpr | MathExpr | ExecExpr | EvalExpr;