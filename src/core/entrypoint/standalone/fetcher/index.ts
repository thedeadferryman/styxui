import { Block } from 'core/block';

import './fallback';
import './http';

export interface LayoutFetcher {
	fetch: (page: string) => Promise<Block | Block[]>;
}