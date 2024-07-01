import React, { useImperativeHandle, useRef } from 'react';
import { classnames } from 'utils';
import Column from 'kit/grid/column';
import Row from 'kit/grid/row.tsx';
import { Box, BoxProps } from 'kit/grid';
import { InputType, labelTints, sizes, tints } from 'kit/input/styles.ts';

export interface BareInputProps extends BoxProps {
	name?: string;

	type: InputType;
	tint?: keyof ReturnType<typeof tints>;
	size?: keyof typeof sizes;
	disabled?: boolean;

	placeholder?: string;
	label?: string;

	value?: string | number;

	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => unknown;
}

export interface InputControls {
	blur: () => unknown;
	getFieldOffset: () => number;
}

const BareInput = React.forwardRef(({
	type, disabled,
	name,
	tint, size,
	placeholder, label,
	value,
	onChange,
	onBlur, onFocus,
	onKeyDown,
}: BareInputProps, ref: React.Ref<InputControls>) => {
	const labelRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(ref, () => ({
		blur: () => inputRef.current?.blur(),
		getFieldOffset: () => labelRef.current?.clientWidth ?? 0,
	}), []);

	return (
		<Row
			span={'grow'}
			gap={'collapse'}
			align={'stretch'}
			place={'stretch'}
		>
			{label && (
				<Column
					ref={labelRef}
					align={'center'}
					place={'center'}
					className={classnames(
						labelTints[tint ?? 'regular'],
					)}
				>
					<Box className={'text-sm mx-2 align-middle'}>
						{label}
					</Box>
				</Column>
			)}
			<input
				ref={inputRef}
				className={classnames(
					'flex-grow',
					tints(disabled)[tint ?? 'regular'],
					sizes[size ?? 'regular'],
					'transition-all',
				)}
				name={name}
				type={type}
				value={value}
				disabled={disabled}
				placeholder={placeholder}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
		</Row>
	);
});

export default BareInput;