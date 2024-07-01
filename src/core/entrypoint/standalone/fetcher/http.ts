import { isBlock } from 'core/block';
import { LayoutFetcher } from 'core/entrypoint/standalone/fetcher/index.ts';

export class HTTPLayoutFetcher implements LayoutFetcher {
	constructor(
		private readonly url: string | URL,
		private readonly fallback: LayoutFetcher,
	) {
	}

	fetch = (page: string) => {
		const url = new URL(this.url);

		url.searchParams.set('page', page);

		return fetch(url, {
			method: 'GET',
		})
			.then(result => result.json())
			.then(result => {
				if (!isBlock(result)) throw new Error('response is not a block layout');
				return result;
			})
			.catch(error => {
				console.warn(error);
				return this.fallback.fetch(page);
			});
	};
}