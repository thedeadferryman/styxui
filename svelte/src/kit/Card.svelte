<script context='module' lang='ts'>
	export const tints = {
		primary: {
			card: 'border-primary',
			title: 'text-primary',
		},
		secondary: {
			card: 'border-secondary',
			title: '',
		},
		regular: {
			card: 'border-slate-800',
			title: '',
		},
	} as const;
</script>

<script lang='ts'>
	import { classnames } from 'utils';

	export let tint: keyof typeof tints;

	export let title: string;

	export let className: string = '';
</script>

<div class={classnames(
	'flex flex-col border-2',
	'm-2',
	tints[tint].card,
	className,
	)}>
	<div class='-translate-y-1/2 ml-2'>
		<span class={classnames(
			'bg-white px-2 font-bold',
			tints[tint].title,
			)}>
			{title}
		</span>
	</div>
	<div class='p-3 pt-1'>
		<slot />
	</div>
</div>