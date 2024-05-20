import * as React from 'react';
import { Grid, GridElementProps } from '.';

const Column: React.FC<GridElementProps> = (props) => (
	<Grid direction={'column'} {...props} />
);

export default Column;