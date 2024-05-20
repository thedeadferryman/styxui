import { Root } from 'root.tsx';
import { createRoot } from 'react-dom/client';
import { isNotNil } from 'utils';

const elem = document.getElementById('root');

if (isNotNil(elem)) {
	const root = createRoot(elem);
	root.render(<Root />);
}
