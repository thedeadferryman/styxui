import React from 'react';
import { BoxProps } from 'kit/grid/box.tsx';
import Grid from 'kit/grid/grid.tsx';

const Column = React.forwardRef((props: BoxProps, ref: React.Ref<HTMLDivElement>) => (
	<Grid ref={ref} direction={'column'} {...props} />
));

export default Column;