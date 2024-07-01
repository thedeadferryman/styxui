import { Block, isKitBlock, KitBlock } from 'core/block';
import ExprCompiler from 'core/compiler/block/expr.ts';
import { escapeQuotes } from 'core/compiler/block/helpers.ts';
import { isNil } from 'utils';

class BlockCompiler {
	constructor(
		private readonly exprCompiler: ExprCompiler,
	) {
	}

	compile = (
		componentName: string,
		root: Block,
	) => {
		const [compiled, deps] = this.compileBlock(root);

		return `
		
			//////////////////////////////////
			${deps}
			//////////////////////////////////
			function ${componentName}(props){return (${compiled});};
		`;
	};

	private compileBlock = (block: Block): [string, string[]] => {
		if (isKitBlock(block)) {
			const [compiled, deps] = this.compileKitBlock(block);

			return [compiled, deps];
		} else {
			return ['', []];
		}
	};

	private compileKitBlock = (block: KitBlock) => {
		const deps: string[] = [];
		const body: string[] = [];

		for (const elem of (block.body ?? [])) {
			const [compiled, elDeps] = this.compileBlock(elem);

			deps.push(...elDeps);
			body.push(compiled);
		}

		const compiled = (
			`React.createElement(Kit.${block.$}, `
			+ this.compileBlockProps(block)
			+ (
				isNil(block.body)
					? ''
					: ',[' + body.join(', ') + ']'
			)
			+ ')'
		);


		return [compiled, deps] as const;
	};

	private compileBlockProps = (block: KitBlock) => (
		'({ '
		+ Object
			.entries(block.props ?? {})
			.map(([prop, value]) => (
				[escapeQuotes(prop), this.exprCompiler.compile(value)].join(' : ')
			))
			.join(', ')
		+ ' })'
	);
}

export default BlockCompiler;