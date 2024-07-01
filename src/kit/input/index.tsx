import { Signal } from 'core/command/signals';
import BareInput from 'kit/input/bare';
import React from 'react';
import { tints } from 'kit/button/styles';
import { InputType, sizes } from 'kit/input/styles.ts';

export interface InputProps {
	type: InputType;
	tint?: keyof ReturnType<typeof tints>;
	size?: keyof typeof sizes;
	disabled?: boolean;

	placeholder?: string;

	value?: string | number;
	onSignal: (signal: Signal, value: string | number) => unknown;
}

const Input: React.FC<InputProps> = ({ onSignal, ...props }) => (
	<BareInput {...props} />
);

export default Input;