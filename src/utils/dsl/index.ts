import { Expr, LiteralExpr } from 'core/command';
import { Block } from 'core/block';
import { isString } from 'utils/common.ts';

export const lit = <T extends LiteralExpr['value']>(value: T) => ({
	$: 'lit', value,
} satisfies LiteralExpr);

export const text = (value: string | Expr): Block<'Text'> => ({
	$: 'Text',
	props: {
		text: isString(value) ? lit(value) : value,
	},
});