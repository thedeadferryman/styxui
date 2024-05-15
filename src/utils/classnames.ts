/*
 * Copyright 2024 Karl F. Meinkopf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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