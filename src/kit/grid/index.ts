import { GridProps } from './grid';

export type GridElementProps = Omit<GridProps, 'direction'>;

export * from './grid';