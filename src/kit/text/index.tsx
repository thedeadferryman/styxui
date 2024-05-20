import React from 'react';

export interface TextProps {
	text: string;
}
const Text: React.FC<TextProps> = ({ text }) => (
	<>{text}</>
);

export default Text;