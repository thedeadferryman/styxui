import { Expr, LiteralExpr } from 'core/command';
import { KitBlock } from 'core/block';
import { isString } from 'utils/common';

export const lit = <T extends LiteralExpr['value']>(value: T) => ({
	$: 'lit', value,
} satisfies LiteralExpr);

export const text = (value: string | Expr): KitBlock<'Text'> => ({
	$: 'Text',
	props: {
		text: isString(value) ? lit(value) : value,
	},
});