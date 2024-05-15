<!--
  - Copyright 2024 Karl F. Meinkopf
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -   http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -
  -->

<script lang="ts" context="module">
	export const sizes = {
		small: [
			'border-2 px-2 py-1 text-sm',
		],
		regular: [
			'border-2 px-3 py-1',
		],
		large: [
			'border-2 px-4 py-1.5 text-lg',
		],
		xl: [
			'border-2 px-4 py-2 text-xl',
		],
	} as const;

	const commonTint = (disabled: boolean) => [
		'active:border-transparent',
		...(disabled
				? ['text-black/50']
				: []
		),
	] as const;

	export const tints = (disabled: boolean = false) => ({
		primary: [
			...commonTint(disabled),
			'border-primary',
			'hover:bg-primary',
			'active:bg-primary/75',
			...(disabled
					? [
						'!bg-primary/25',
						'!border-primary/25',
					]
					: []
			),
		],
		secondary: [
			...commonTint(disabled),
			'border-secondary',
			'hover:bg-secondary',
			'active:bg-secondary/75',
			...(disabled
					? [
						'!bg-secondary/25',
						'!border-secondary/25',
					]
					: []
			),
		],
		regular: [
			...commonTint(disabled),
			'border-zinc-400',
			'hover:bg-zinc-400',
			'active:bg-zinc-400/75',
			...(disabled
					? [
						'!bg-zinc-400/25',
						'!border-zinc-400/25',
					]
					: []
			),
		],
		error: [
			...commonTint(disabled),
			'border-rose-400',
			'hover:bg-rose-400',
			'active:bg-rose-400/75',
			...(disabled
					? [
						'!bg-rose-400/25',
						'!border-rose-400/25',
					]
					: []
			),
		],
	} as const);

</script>

<script lang="ts">
	import { classnames } from 'utils';

	export let tint: keyof ReturnType<typeof tints> = 'regular';
	export let size: keyof typeof sizes = 'regular';

	export let className: string = '';

	export let disabled: boolean = false;

	let classNameInt: string = '';

	$: {
		classNameInt = classnames(
			className,
			'font-display',
			'cursor-pointer',
			'transition-all',
			'bg-transparent',
			tints(disabled)[tint],
			sizes[size],
		);
	}
</script>

<button
  on:click
  {disabled}
  class={classNameInt}
>
  <slot></slot>
</button>