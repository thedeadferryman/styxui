<script context="module" lang="ts">
	const styles = ['primary', 'secondary', 'regular', 'error'] as const;
</script>

<script lang="ts">
	import Button from './kit/Button.svelte';

	let style = 0;

	const onClick = () => {
		style = (style + 1) % styles.length;
	};
</script>

<main>
  <Button
    tint={styles[style]}
    on:click={onClick}
  >
    Click me!
  </Button>
</main>