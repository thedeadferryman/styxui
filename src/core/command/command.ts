import { Expr } from 'core/command/expr';

export interface SetCommand {
	$: 'set';
	path: string;
	value: Expr;
}

export interface CallCommand {
	$: 'call';
	proc: string;
	args: Expr[];
}

export interface ReturnCommand {
	$: 'return';
	value: Expr;
}

export interface ChainCommand {
	$: 'chain';
	body: Command[];
}

export interface BindChainCommand {
	$: 'binds';
	body: Command[];
}

export interface BindCommand {
	$: 'bind';
	then?: Command;
	catch?: Command;
}

export interface DelayCommand {
	$: 'delay';
	time: number;
}

export interface CallbackCommand {
	$: 'callback';
	callback: (args: any) => any;
}

export type Command =
	SetCommand
	| CallCommand
	| ChainCommand
	| ReturnCommand
	| BindCommand
	| BindChainCommand
	| DelayCommand
	| CallbackCommand
	;