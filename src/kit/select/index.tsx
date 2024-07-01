import scroll from 'utils/ui/scroll';
import useArrowPicker from './arrow-picker';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { classnames, isNil, noop, uniqueId } from 'utils';
import BareInput, { InputControls } from 'kit/input/bare';
import { tints } from 'kit/input/styles';

interface BaseOption<T extends string> {
	value: T;
	render: React.ReactNode;
}

const optionsBase = classnames([
	'absolute',
	'inset-x-0 z-50',
	'shadow-lg',
	'max-h-0',
	'bg-white',
	'text-black',
	'opacity-0',
	'overflow-x-auto',
	'transition-all',
	'pointer-events-none',
]);

const optionsVisible = classnames([
	'!opacity-100',
	'!pointer-events-auto',
	'!max-h-96',
]);

const optionBase = classnames([
	'p-2',
	'cursor-pointer',
	'transition',
]);

const optionHovered = (tint: keyof ReturnType<typeof tints>) => classnames([
	{
		error: 'bg-rose-400 text-white',
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary',
		regular: 'bg-zinc-400',
	}[tint],
	'text-white',
]);

const valueViewer = classnames([
	'absolute',
	'inset-x-0 bottom-0',
	'border-b-2',
	'border-transparent',
	'p-1 pl-2',
	'pointer-events-none',
]);

interface SelectProps<V extends string, T extends BaseOption<V>> {
	label?: string;
	tooltip?: React.ReactNode;

	error?: boolean;

	name?: string;
	value?: V;

	tint?: keyof ReturnType<typeof tints>;

	options: readonly T[];

	onChange?: (value: V) => unknown;
	filter?: (option: T, query: string) => boolean,

	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => unknown;
}

const Select = <V extends string, T extends BaseOption<V>>({
	label, value, name, tint,
	options, filter: inFilter,
	onChange = noop, onFocus = noop, onBlur = noop,
}: SelectProps<V, T>): JSX.Element => {
	const queryField = useRef<InputControls>(null);
	const optionsList = useRef<HTMLDivElement>(null);

	const [query, setQuery] = useState<string>();
	const [randName] = useState(uniqueId('##select-input-'));
	const [selection, setSelection] = useState<T | undefined>();
	const [focused, setFocused] = useState(false);
	const [keyPick, setKeyPick] = useState<number>();

	const realName = useMemo(() => (name ?? randName), [name, randName]);
	const filter = useMemo(() => (
		inFilter ?? ((o: T, q: string) => (
			o.value.toLowerCase().includes(q.toLowerCase())
		))
	), [inFilter]);
	const displaysValue = useMemo(
		() => (!isNil(selection) && !focused),
		[focused, selection],
	);
	const onQueryBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			onBlur(e);
			setTimeout(() => setFocused(false), 200);
		},
		[onBlur],
	);

	const filteredOptions = useMemo(() => (
		isNil(query)
			? options
			: options.filter(e => filter(e, query))
	), [query, options, filter]);

	const pickedValue = isNil(keyPick)
		? undefined
		: filteredOptions[keyPick]?.value;

	const onQueryFocus = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			setFocused(true);
			onFocus(e);
		},
		[onFocus],
	);

	const select = useCallback((newValue: T) => {
		setSelection(newValue);
		setQuery('');
		onChange(newValue?.value);
	}, [onChange]);

	const setArrowSelection = (id: number) => {
		select(filteredOptions[id]);
		queryField.current?.blur();
	};
	const { onKeyDown } = useArrowPicker({
		current: keyPick,
		total: filteredOptions.length,
		setPick: setKeyPick,
		setSelection: setArrowSelection,
	});

	useEffect(
		() => setSelection(options.find(o => o.value === value)),
		[options, value],
	);

	useEffect(
		() => setKeyPick(undefined),
		[filteredOptions],
	);
	useEffect(() => {
		if (optionsList.current && pickedValue) {
			scroll(optionsList.current).toId(pickedValue);
		}
	}, [pickedValue]);

	return (
		<div
			className={'grow'}
		>
			<div className={'relative'}>
				<BareInput
					tint={tint}
					type={'text'}
					value={query}
					label={label}
					ref={queryField}
					name={`##sel-qf--${realName}`}
					onBlur={onQueryBlur}
					onFocus={onQueryFocus}
					onKeyDown={onKeyDown}
					onChange={v => setQuery(v.target.value)}
				/>
				{displaysValue && (
					<div
						className={classnames(
							valueViewer,
						)}
						style={{ left: queryField.current?.getFieldOffset() ?? 0 }}
					>
						{selection?.render}
					</div>
				)}
			</div>
			<div className={'relative'}>
				<div
					ref={optionsList}
					className={classnames(
						optionsBase,
						{ [optionsVisible]: focused },
					)}
					style={{ left: queryField.current?.getFieldOffset() ?? 0 }}
				>
					{filteredOptions.map((op, id) => (
						<div
							id={op.value}
							key={op.value}
							className={classnames(
								optionBase,
								{ [optionHovered(tint ?? 'regular')]: keyPick === id },
							)}
							onMouseEnter={() => setKeyPick(id)}
							onMouseLeave={() => setKeyPick(undefined)}
							onClick={() => select(op)}
						>
							{op.render}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Select;