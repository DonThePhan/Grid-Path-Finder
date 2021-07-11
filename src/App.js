import { useEffect, useContext } from 'react';
import './App.css';

//* Components
import Grid from './components/Grid/Grid';
import Controls from './components/Controls/Controls';

//* useContext
import GridContext from './components/store/gridContext';
import ControlContext from './components/store/controlContext';

function App() {
	const { grid, plotLine } = useContext(GridContext);
	const { control } = useContext(ControlContext);

	useEffect(
		() => {
			if (control === 'plotLine') {
				setTimeout(plotLine, 20);
			}
		},
		[ control, plotLine ]
	);

	return (
		<div className="app">
			<h1>Path Finder</h1>
			<Controls />
			<Grid grid={grid} />
		</div>
	);
}

export default App;
