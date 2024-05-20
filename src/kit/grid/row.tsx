import * as React from 'react';
import { Grid, GridElementProps } from '.';

const Row: React.FC<GridElementProps> = (props) => (
	<Grid direction={'row'} {...props} />
);

export default Row;