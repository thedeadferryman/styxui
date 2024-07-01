import React from 'react';
import { BoxProps } from 'kit/grid/box.tsx';
import Grid from 'kit/grid/grid.tsx';

const Row = React.forwardRef((props: BoxProps, ref: React.Ref<HTMLDivElement>) => (
	<Grid ref={ref} direction={'row'} {...props} />
));

export default Row;