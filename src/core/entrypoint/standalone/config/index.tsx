import Card from 'kit/card';
import Column from 'kit/grid/column';
import Row from 'kit/grid/row';
import FetcherConfig from 'core/entrypoint/standalone/config/fetcherConfig.tsx';

const Config = () => {
	return (
		<Column align={'stretch'} gap={'sparse'}>
			<div className={'flex-grow text-2xl'}>Settings</div>
			<Row place={'evenly'}>
				<Card
					span={'grow'}
					tint={'primary'}
					title={'Layout source'}
				>
					<FetcherConfig />
				</Card>
			</Row>
		</Column>
	);
};

export default Config;