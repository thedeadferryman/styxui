import type { ExprEvaluator } from 'core/command/evaluator';
import type { CallCommand, Command } from 'core/command/command';
import type { ProcedureCaller } from 'core/command/caller';
import { set } from 'utils/object';
import { delay, isNotNil } from 'utils';
import { Dispatch, SetStateAction } from 'react';

const wrapPromise = (value: unknown) => (
	(value instanceof Promise) ? value : Promise.resolve(value)
);

export class CommandExecutor {
	constructor(
		private readonly evaluator: ExprEvaluator,
		private readonly updater: Dispatch<SetStateAction<{}>>,
		private readonly procedureCaller: ProcedureCaller,
	) {
		this.evaluator.setExecutor(this);
	}

	execute = (command: Command, context?: any) => {
		switch (command.$) {
			case 'delay':
				return delay(command.time);
			case 'chain':
				return this.executeChain(command.body, context);
			case 'binds':
				return this.executeBindChain(command.body, context);
			case 'call':
				return this.callProc(command, context);
			case 'bind':
				return this.doBind(wrapPromise(context), command.then, command.catch);
			case 'set':
				this.updater(store => set(
					store, command.path,
					this.evaluator.evaluate(command.value, context),
				));
				return undefined;
			case 'return':
				return this.evaluator.evaluate(command.value, context);
			case 'callback':
				return command.callback(context);
		}
	};

	private callProc = (
		cmd: CallCommand,
		context?: any,
	) => this.procedureCaller.call(
		cmd.proc,
		cmd.args.map(arg => this.evaluator.evaluate(arg, context)),
	);

	private doBind = (
		promise: Promise<any>,
		then?: Command,
		catcher?: Command,
	): Promise<any> => {
		if (isNotNil(then)) {
			return this.doBind(promise.then(v => this.execute(then, v)), undefined, catcher);
		}
		if (isNotNil(catcher)) {
			return this.doBind(promise.catch(v => this.execute(catcher, v)), then, undefined);
		}
		return promise;
	};


	private executeChain = (
		commands: Command[],
		context?: any,
	): (ctx: any) => any => {
		if (commands.length < 1) return context;

		const [current, ...rest] = commands;

		return this.executeChain(rest, this.execute(current, context));
	};

	private executeBindChain = (
		commands: Command[],
		context?: any,
	) => {
		if (commands.length < 1) return context;
		const [current, ...rest] = commands;

		return this.executeChain(
			[
				current,
				...rest.map(command => ({
					$: 'bind',
					then: command,
				} satisfies Command)),
			],
			context,
		);
	};
}