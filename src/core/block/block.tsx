import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Block, createRenderer } from 'core/block';
import { CommandExecutor, createEvaluator, ProcedureCaller } from 'core/command';

export interface AppProps {
	initialState: {};
	layout: Block;
	caller: ProcedureCaller;
}

const RenderedBlock: React.FC<AppProps> = ({
	initialState, layout, caller,
}) => {
	const [state, setState] = useState(initialState);

	const [rendered, setRendered] = useState<ReactNode>();
	const evaluator = useMemo(() => createEvaluator(initialState), [initialState]);
	const executor = useMemo(
		() => new CommandExecutor(evaluator, setState, caller),
		[evaluator, caller],
	);

	const renderer = useMemo(() => createRenderer(evaluator, executor, caller), [evaluator, executor]);

	useEffect(() => {
		evaluator.setState(state);
		setRendered(renderer.render(layout));
	}, [layout, state]);

	return rendered;
};

export default RenderedBlock;