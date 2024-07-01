//////////////////////////////////

import React from 'react';
import { Kit } from './kit';
import { get } from './utils/object';

const TestRoot = (props) => {
	return (React.createElement(Kit.Column, ({ align: 'stretch' }), [React.createElement(Kit.Row, ({ spacing: 'sparse' }), [React.createElement(Kit.Card, ({
		sizing: 'grow',
		title: ('value = ' + get(state, 'card1.counter')),
	}), [React.createElement(Kit.Row, ({
		align: 'center',
		spacing: 'dense',
	}), [React.createElement(Kit.Button, ({ tint: 'secondary' }), [React.createElement(Kit.Text, ({ text: 'Decrement' }), [])]), React.createElement(Kit.Button, ({ tint: 'secondary' }), [React.createElement(Kit.Text, ({ text: 'Increment' }), [])]), React.createElement(Kit.Input, ({ tint: 'primary' }), []), React.createElement(Kit.Text, ({ text: (/*exec*/ undefined) }), []), React.createElement(Kit.Button, ({ tint: 'primary' }), [React.createElement(Kit.Text, ({ text: 'Submit' }), [])])])])])]));
};
		