import React, { useMemo } from 'react';
import Select from 'kit/select';

import 'core/entrypoint/standalone/fetcher';

const getFetchers = () => window.styxUI.layoutFetcherRegistry.fetchers;

const FetcherConfig: React.FC = () => {
	const fetchers = useMemo(() => getFetchers(), []);
	const options = useMemo(() => (
		fetchers.map(fetcher => ({ value: fetcher.id, render: fetcher.name }))
	), [fetchers]);

	return (
		<div className='block'>
			<Select
				tint={'primary'}
				label={'Source type'}
				options={options}
			/>
		</div>
	);
};

export default FetcherConfig;