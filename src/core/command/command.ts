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
	$: 'expr';
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

export interface DebounceCommand {
	$: 'debounce';
	body: Command;
	delay: number;
}

export type RuntimeCommand =
	SetCommand
	| CallCommand
	| ChainCommand
	| ReturnCommand
	| BindCommand
	| BindChainCommand
	| DelayCommand
	| CallbackCommand;

export type CompiledCommand =
	DebounceCommand;

export type Command =
	CompiledCommand | RuntimeCommand;