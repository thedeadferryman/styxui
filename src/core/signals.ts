export const signals = [
	'click', 'change',
] as const;

export type Signal = typeof signals[number];

export const isSignal = (value: unknown): value is Signal => (
	signals.includes(value as Signal)
);