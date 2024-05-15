import { isRecord, identity, isNotNil, isReadonlyArray } from './common';

type ScalarClassNameArg = string | null | undefined;
type FlatClassNameArg = ScalarClassNameArg | Readonly<Record<string, boolean>>;
type ClassNameArg = FlatClassNameArg | readonly ClassNameArg[];

const reduceArrayArgs = (args: ClassNameArg): FlatClassNameArg[] => (
	isReadonlyArray(args)
		? args.map(reduceArrayArgs).flat()
		: [args]
);

const reduceObjectArg = (arg: FlatClassNameArg): ScalarClassNameArg[] => (
	isRecord(arg)
		? Object.entries(arg)
			.map(identity)
			.filter(([, enabled]) => enabled)
			.map(([key]) => key)
		: [arg]
);

const reduceObjectArgs = (args: FlatClassNameArg[]) => args.map(reduceObjectArg).flat();

const classnames = (...args: ClassNameArg[]) =>
	reduceObjectArgs(reduceArrayArgs(args)).filter(isNotNil).join(' ');

export default classnames;