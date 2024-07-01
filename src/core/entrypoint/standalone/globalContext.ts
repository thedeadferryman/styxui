import { LayoutFetcherRegistry } from './fetcher/registry';

declare global {
	interface Window {
		styxUI: {
			layoutFetcherRegistry: LayoutFetcherRegistry;
		};
	}
}

window.styxUI = {
	layoutFetcherRegistry: new LayoutFetcherRegistry(),
};

