import React from 'react';
import { Block } from 'core/block';
import { LayoutFetcher } from 'core/entrypoint/standalone/fetcher/index.ts';

export type FetcherFactory = (
	state: any,
) => LayoutFetcher;

export interface FetcherConfig {
	id: string;
	name: React.ReactNode;
	factory: FetcherFactory;
	configUI?: Block;
}

export class LayoutFetcherRegistry {
	private registry: Map<string, FetcherConfig>;

	constructor() {
		this.registry = new Map();
	}

	get fetchers() {
		return Array.from(this.registry.values());
	}

	register(creator: FetcherConfig) {
		this.registry.set(creator.id, creator);
	}

	get(id: string): FetcherConfig | undefined {
		return this.registry.get(id) ?? undefined;
	}
}