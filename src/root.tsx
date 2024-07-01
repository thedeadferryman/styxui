import './app.css';
import StandaloneFrontend from 'core/entrypoint/standalone';

// const caller = {
// 	call: (name: string, args: any[]) => (
// 		fetch(`https://api.ipify.org/?method=${name}&args=${encodeURIComponent(JSON.stringify(args))}`)
// 			.then(value => value.text())
// 	),
// } satisfies ProcedureCaller;

export const Root = () => {
	// const layout = useMemo((): Block => ({
	// 	$: 'Column',
	// 	props: {
	// 		align: lit('stretch'),
	// 	},
	// 	body: [
	// 		{
	// 			$: 'Row',
	// 			props: {
	// 				spacing: lit('sparse'),
	// 			},
	// 			body: [
	// 				{
	// 					$: 'Card',
	// 					props: {
	// 						sizing: lit('grow'),
	// 						title: {
	// 							$: '+',
	// 							args: [
	// 								lit('value = '),
	// 								{ $: 'get', path: 'card1.counter' },
	// 							],
	// 						},
	// 					},
	// 					body: [
	// 						{
	// 							$: 'Row',
	// 							props: {
	// 								align: lit('center'),
	// 								spacing: lit('dense'),
	// 							},
	// 							body: [
	// 								{
	// 									$: 'Button',
	// 									props: { tint: lit('secondary') },
	// 									body: [text('Decrement')],
	// 									bind: {
	// 										click: {
	// 											$: 'set',
	// 											path: 'card1.counter',
	// 											value: {
	// 												$: '-',
	// 												args: [
	// 													{
	// 														$: '||', args: [
	// 															{ $: 'get', path: 'card1.counter' },
	// 															lit(0),
	// 														],
	// 													},
	// 													lit(1),
	// 												],
	// 											},
	// 										},
	// 									},
	// 								},
	// 								{
	// 									$: 'Button',
	// 									props: { tint: lit('secondary') },
	// 									body: [text('Increment')],
	// 									bind: {
	// 										click: {
	// 											$: 'set',
	// 											path: 'card1.counter',
	// 											value: {
	// 												$: '+',
	// 												args: [
	// 													{
	// 														$: '||', args: [
	// 															{ $: 'get', path: 'card1.counter' },
	// 															lit(0),
	// 														],
	// 													},
	// 													lit(1),
	// 												],
	// 											},
	// 										},
	// 									},
	// 								},
	// 								{
	// 									$: 'Input',
	// 									props: {
	// 										tint: lit('primary'),
	// 									},
	// 									bind: {
	// 										change: {
	// 											$: 'debounce',
	// 											delay: 250,
	// 											body: {
	// 												$: 'set',
	// 												path: 'card1.text',
	// 												value: {
	// 													$: 'arg',
	// 													path: undefined,
	// 												},
	// 											},
	// 										},
	// 									},
	// 								},
	// 								text({
	// 									$: 'exec',
	// 									body: {
	// 										$: 'chain',
	// 										body: [
	// 											{ $: 'expr', value: { $: 'get', path: undefined } },
	// 											{ $: 'callback', callback: arg => JSON.stringify(arg, undefined, 2) },
	// 										],
	// 									},
	// 								}),
	// 								{
	// 									$: 'Button',
	// 									props: { tint: lit('primary') },
	// 									body: [text('Submit')],
	// 									bind: {
	// 										click: {
	// 											$: 'chain',
	// 											body: [
	// 												{
	// 													$: 'call',
	// 													proc: 'counter.set',
	// 													args: [{
	// 														$: 'obj',
	// 														props: {
	// 															value: {
	// 																$: 'get',
	// 																path: 'card1.counter',
	// 															},
	// 														},
	// 													}],
	// 												},
	// 												{
	// 													$: 'bind',
	// 													then: { $: 'callback', callback: (val) => console.info(val) },
	// 													catch: { $: 'callback', callback: (val) => console.warn(val) },
	// 												},
	// 											],
	// 										},
	// 									},
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// }), []);

	return (
		<StandaloneFrontend />
	);
};
