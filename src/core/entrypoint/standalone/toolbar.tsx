import React from 'react';
import { classnames } from 'utils';
import { PageLink } from 'core/entrypoint/common/types';
import Column from 'kit/grid/column';
import { ViewKey } from 'core/entrypoint/standalone/values.ts';

const commonTint = 'text-white';

const tints = {
	regular: [
		commonTint,
		'bg-zinc-500',
	],
	primary: [
		commonTint,
		'bg-primary',
	],
	secondary: [
		'bg-secondary',
	],
	error: [
		commonTint,
		'bg-rose-600',
	],
};

export interface ToolbarProps {
	tint?: keyof typeof tints;
	title?: string;
	pages: PageLink[];
	activePage?: string;
	activeView: ViewKey;
}

const Toolbar: React.FC<ToolbarProps> = ({
	title,
	tint,
	pages,
	activePage, activeView,
}) => (
	<nav
		className={classnames(
			'flex flex-col',
			'justify-stretch',
			tints[tint ?? 'regular'],
		)}
	>
		<div className={'text-xl py-3 px-6 text-center'}>
			{title ?? 'StyxUI'}
		</div>

		<Column span={'grow'} gap={'collapse'}>
			{pages.map(({ id, title }) => (
				<a
					key={id}
					href={`?page=${id}`}
					className={classnames(
						'py-2 px-8',
						'border-b border-white/25',
						'last:border-b-0',
						'hover:bg-white/20',
						'active:bg-white/25',
						'transition-all',
						{
							'!bg-black/20': (id === activePage && activeView === 'pages'),
						},
					)}
				>
					{title}
				</a>
			))}
		</Column>

		<Column>
			<a
				href={`?in=config`}
				className={classnames(
					'py-2 px-8',
					'border-b border-white/25',
					'last:border-b-0',
					'hover:bg-white/20',
					'active:bg-white/25',
					'transition-all',
					{ '!bg-black/20': activeView === 'config' },
				)}
			>
				Config
			</a>
			<a
				target={'_blank'}
				className={'text-sm px-2 py-2 underline'}
				href={'https://github.com/thedeadferryman/styxui'}
			>
				Powered by StyxUI
			</a>
		</Column>
	</nav>
);

export default Toolbar;