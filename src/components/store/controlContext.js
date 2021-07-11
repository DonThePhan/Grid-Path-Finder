import React, { useState, useContext } from 'react';
import GridContext from './gridContext';

const ControlContext = React.createContext({
	control: undefined,
	setControl: () => {},
	startEnd: undefined,
	setStartEnd: () => {},
	mouseDown: undefined,
	setMouseDown: () => {},
	controlButtonClick: () => {},
	overCell: () => {},
	addStartEnd: () => {},
	removeStartEnd: () => {},
	resetControl: () => {},
	algorithm: undefined,
	setAlgorithm: () => {}
});

export const ControlProvider = (props) => {
	const { setGrid } = useContext(GridContext);

	const [ control, setControl ] = useState('start-end-node');
	const [ mouseDown, setMouseDown ] = useState(false);
	const [ startEnd, setStartEnd ] = useState({ start: [], end: [] });
	const [ algorithm, setAlgorithm ] = useState('aStar');

	function controlButtonClick(setting) {
		setControl(setting);
	}

    /** allows for mouse drag & draw (especially for 'Block's) */
	function overCell(cell, firstSquare) {
		// console.log('OverCell', mouseDown); //! the setMouseDown function is delayed so we're adding an extra parameter (firstSquare)
		if (firstSquare || mouseDown) {
			const y = cell.y;
			const x = cell.x;

			// console.log(`${y}, ${x}`);
			setGrid((prevGrid) => {
				const newGrid = [ ...prevGrid ];

				if (prevGrid[y][x].class === control) {
					// remove class

					if (control === 'start-end-node') {
						removeStartEnd(y, x);
					}
					newGrid[y][x].class = '';
				} else {
					// add class

					if (prevGrid[y][x].class === 'start-end-node') {
						removeStartEnd(y, x);
					} else if (control === 'start-end-node') {
						addStartEnd(newGrid, y, x);
					}
					newGrid[y][x].class = control;
				}
				return newGrid;
			});
		}
	}

	function addStartEnd(newGrid, y, x) {
		setStartEnd((prevValue) => {
			if (prevValue.start.length === 0) {
				//! if start is empty, fill start
				return { ...prevValue, start: [ y, x ] };
			} else {
				//! else fill end
				if (prevValue.end.length !== 0) {
					//! if end has value, erase class from this node in the grid
					newGrid[prevValue.end[0]][prevValue.end[1]].class = '';
				}
				return { ...prevValue, end: [ y, x ] };
			}
		});
	}

	function removeStartEnd(y, x) {
		if (startEnd.end.toString() === [ y, x ].toString()) {
			setStartEnd((prevValue) => {
				return { ...prevValue, end: [] };
			});
		} else if (startEnd.start.toString() === [ y, x ].toString()) {
			setStartEnd((prevValue) => {
				return { start: prevValue.end, end: [] };
			});
		}
	}

	function resetControl() {
		setControl('start-end-node');
		setMouseDown(false);
		setStartEnd({ start: [], end: [] });
	}

	return (
		<ControlContext.Provider
			value={{
				control,
				setControl,
				startEnd,
				setStartEnd,
				mouseDown,
				setMouseDown,
				controlButtonClick,
				overCell,
				addStartEnd,
				removeStartEnd,
				resetControl,
				algorithm,
				setAlgorithm
			}}
		>
			{props.children}
		</ControlContext.Provider>
	);
};

export default ControlContext;
