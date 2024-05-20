<script lang='ts'>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const value = writable({});

	setContext('#scope', {
		value,
		setValue: value.update,
	});
</script>

<slot />