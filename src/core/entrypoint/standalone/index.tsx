import './globalContext';

import React from 'react';
import Column from 'kit/grid/column';
import Row from 'kit/grid/row';
import Toolbar from './toolbar';
import Config from './config';
import { useQueryParam } from 'utils/queryParam';
import { asViewKey } from './values';

const queryParamToViewKey = (value: string | string[] | undefined) =>
	asViewKey(
		(Array.isArray(value) ? value[0] : value)?.trim(),
		'pages',
	);

const StandaloneFrontend: React.FC = () => {
	const view = useQueryParam('in', { as: queryParamToViewKey });

	const page = useQueryParam('page', { as: 'string' });

	return (
		<Column className={'absolute inset-0'}>
			<Row align={'stretch'} span={'grow'}>
				<Toolbar
					title={'Testing'}
					tint={'secondary'}
					activeView={view}
					activePage={page}
					pages={[
						{ id: 'overview', title: 'Overview' },
						{ id: 'stats', title: 'Stats' },
						{ id: 'settings', title: 'Settings' },
						{ id: 'about', title: 'About' },
					]}
				/>
				<Column
					span={'grow'}
					className={'mx-4 my-8'}
				>
					{view === 'config' && (
						<Config />
					)}
				</Column>
			</Row>
		</Column>
	);
};

export default StandaloneFrontend;