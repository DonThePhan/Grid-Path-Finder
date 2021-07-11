import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GridProvider } from './components/store/gridContext';
import { ControlProvider } from './components/store/controlContext';
import SelectedAlgorithm from './components/Controls/SelectedAlgorithm'

ReactDOM.render(
	<GridProvider>
		<ControlProvider>
			<SelectedAlgorithm>
				<App />
			</SelectedAlgorithm>
		</ControlProvider>
	</GridProvider>,
	document.getElementById('root')
);
