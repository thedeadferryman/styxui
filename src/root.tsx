import './app.css';
import App from 'core/App';
import { lit, text } from 'utils/dsl';
import { useMemo } from 'react';
import { Block } from 'core/block';

export const Root = () => {
	const layout = useMemo(() => ({
		$: 'Column',
		props: {
			align: lit('stretch'),
		},
		body: [
			{
				$: 'Row',
				props: {
					spacing: lit('sparse'),
				},
				body: [
					{
						$: 'Card',
						props: {
							sizing: lit('grow'),
							title: {
								$: '+',
								args: [
									lit('value = '),
									{ $: 'get', path: 'card1' },
								],
							},
						},
						body: [
							{
								$: 'Button',
								props: {
									tint: lit('secondary'),
								},
								body: [
									text('Press me'),
								],
								bind: {
									click: {
										$: 'set',
										path: 'card1',
										value: {
											$: '+',
											args: [
												{
													$: '||', args: [
														{ $: 'get', path: 'card1' },
														lit(0),
													],
												},
												lit(1),
											],
										},
									},
								},
							},
							text({
								$: 'exec',
								body: {
									$: 'chain',
									body: [
										{ $: 'return', value: { $: 'get', path: undefined } },
										{ $: 'callback', callback: arg => JSON.stringify(arg, undefined, 2) },
									],
								},
							}),
						],
					},
				],
			},
		],
	} satisfies Block), []);
	//
	// useEffect(() => {
	// 	const encoded = encodeURIComponent(JSON.stringify(layout));
	// 	const uri = `data:text/plain,${encoded}`;
	//
	// 	const link = document.createElement('a');
	// 	link.href = uri;
	// 	link.download = 'layout.json';
	//
	// 	link.click();
	// }, [layout]);

	return (
		<div className={'m-6'}>
			<App
				layout={layout}
				initialState={{
					card1: 10,
				}}
				caller={{ call: () => Promise.resolve() }}
			>

			</App>
		</div>
	);
};
