import { isNotNil } from 'utils/common.ts';

export const compact = <T>(array: (T | null | undefined)[]): T[] => array.filter(isNotNil);