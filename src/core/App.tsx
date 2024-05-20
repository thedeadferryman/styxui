import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { Block, LayoutRenderer } from 'core/block';
import { CommandExecutor, ExprEvaluator, ProcedureCaller } from 'core/command';
import { BlockId } from 'kit';

export interface AppProps {
	initialState: {};
	layout: Block<BlockId>;
	caller: ProcedureCaller;
}

const App: React.FC<AppProps> = ({
	initialState, layout, caller,
}) => {
	const [state, setState] = useState(initialState);
	const [rendered, setRendered] = useState<ReactNode>();

	const evaluator = useMemo(() => new ExprEvaluator(initialState), []);
	const executor = useMemo(
		() => new CommandExecutor(evaluator, setState, caller),
		[evaluator, caller, setState],
	);
	const renderer = useMemo(() => new LayoutRenderer(evaluator, executor), [evaluator, executor]);

	useEffect(() => {
		evaluator.setState(state);
		setRendered(renderer.render(layout));
	}, [state, layout]);

	return rendered;
};

export default App;