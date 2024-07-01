import React, { SyntheticEvent, useMemo } from 'react';
import { Key } from 'ts-key-enum';

interface ArrowPickerOptions {
	current?: number;
	total: number;
	setPick: (pick: number) => unknown;
	setSelection: (selection: number) => unknown;
}

const consumeEvent = <E extends SyntheticEvent>(
	event: E,
	callback: (event: E) => void,
) => {
	event.preventDefault();
	event.stopPropagation();
	callback(event);
	return undefined;
};

const useArrowPicker = (
	{ current = -1, total, setPick, setSelection }: ArrowPickerOptions,
) => useMemo(() => ({
	onKeyDown: (e: React.KeyboardEvent) => {
		switch (e.key) {
			case Key.ArrowUp:
				return consumeEvent(
					e, () => setPick(
						(current < 1)
							? total - 1
							: current - 1,
					),
				);
			case Key.ArrowDown:
				return consumeEvent(
					e, () => setPick(
						(current >= total - 1)
							? 0 : current + 1,
					),
				);
			case Key.Enter:
				return consumeEvent(
					e, () => setSelection(current),
				);
		}
	},
}), [current, setPick, setSelection, total]);

export default useArrowPicker;