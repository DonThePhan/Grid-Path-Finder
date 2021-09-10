import React, { useState, useEffect } from 'react';
import mazeGenerator from './mazeGenerator';

const GridContext = React.createContext({
	GRID_ROWS: undefined,
	GRID_COLS: undefined,
	grid: [],
	setGrid: () => {},
	plotPoint: undefined,
	setPlotPoint: () => {},
	plotLine: () => {},
	resetGridContext: () => {},
	createMaze: () => {}
});

export const GridProvider = (props) => {
	//! for the MAZE, ODD numbers look better
	const GRID_ROWS = 21;
	const GRID_COLS = 51;

	const [ grid, setGrid ] = useState(createDefaultGrid());
	const [ plotPoint, setPlotPoint ] = useState({ y: null, x: null });
	const [ pathingOrder, setPathingOrder ] = useState([]);

	function plotLine() {
		// Stop when end-node hit
		if (grid[plotPoint.y][plotPoint.x].class === 'start-end-node') {
			return;
		}
		setGrid((prevGrid) => {
			let newGrid = [ ...prevGrid ];

			newGrid[plotPoint.y][plotPoint.x].class = 'path';
			setPlotPoint(newGrid[plotPoint.y][plotPoint.x].prevVertex);

			return newGrid;
		});
	}

	function createDefaultGrid() {
		const defaultGrid = [];

		for (let y = 0; y < GRID_ROWS; y++) {
			const grid_row = [];
			for (let x = 0; x < GRID_COLS; x++) {
				grid_row.push({
					shrtstDis: Infinity,
					x: x,
					y: y,
					bubbled: false,
					class: '',
					vertex: [ y, x ],
					prevVertex: { y: null, x: null },
					gCost: Infinity, // Distance to Start node
					hCost: Infinity, // Distance to End node
					get fCost() {
						return this.gCost + this.hCost;
					}
				});
			}
			defaultGrid.push(grid_row);
		}
		return defaultGrid;
	}

	function resetGridContext() {
		setGrid(createDefaultGrid());
		setPlotPoint({ y: null, x: null });
	}

	useEffect(
		() => {
			if (pathingOrder.length > 0) {
				console.log('here');
				setTimeout(() => {
					setPathingOrder((nodes) => {
						const newNodes = [ ...nodes ];
						const node = newNodes.shift();
						setGrid((prevGrid) => {
							const newGrid = [ ...prevGrid ];
							newGrid[node[0]][node[1]].class = '';
							return newGrid;
						});
						return newNodes;
					});
				}, 10);
			}
		},
		[ pathingOrder, setPathingOrder, setGrid ]
	);

	function createMaze() {
        const { pathingOrder, defaultGrid /*grid: maze, startingNode*/ } = mazeGenerator(GRID_ROWS, GRID_COLS);

		setPathingOrder(pathingOrder);

		setGrid(() => {
			const newGrid = createDefaultGrid();
			for (let y = 0; y < GRID_ROWS; y++) {
				for (let x = 0; x < GRID_COLS; x++) {
					if (defaultGrid[y][x] === 1) {
						newGrid[y][x].class = 'block';
					}
				}
			}
			return newGrid;
		});
	}

	return (
		<GridContext.Provider
			value={{
				GRID_ROWS,
				GRID_COLS,
				grid,
				setGrid,
				plotPoint,
				setPlotPoint,
				plotLine,
				resetGridContext: resetGridContext,
				createMaze
			}}
		>
			{props.children}
		</GridContext.Provider>
	);
};

export default GridContext;
