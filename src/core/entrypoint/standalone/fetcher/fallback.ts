import { Block } from 'core/block';
import { lit } from 'utils/dsl';
import { LayoutFetcher } from 'core/entrypoint/standalone/fetcher/index.ts';

export class FallbackLayoutFetcher implements LayoutFetcher {
	fetch = (_: string) => Promise.resolve<Block>({
		$: 'Column',
		props: {
			span: lit('grow'),
			align: lit('center'),
		},
		body: [{
			$: 'Text',
			props: {
				tint: lit('error'),
				size: lit('xxl'),
				className: lit('pt-4'),
				text: lit('Failed to fetch UI'),
			},
		}],
	});
}

window.styxUI.layoutFetcherRegistry.register({
	id: 'fallback',
	name: 'Fallback source',
	factory: () => new FallbackLayoutFetcher(),
});