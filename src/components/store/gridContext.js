import React, { useState } from 'react';

const GridContext = React.createContext({
	GRID_ROWS: undefined,
	GRID_COLS: undefined,
	grid: [],
	setGrid: () => {},
	plotPoint: undefined,
	setPlotPoint: () => {},
    plotLine: () => { },
    restGridContext: () => { },
});

export const GridProvider = (props) => {
	const GRID_ROWS = 20;
	const GRID_COLS = 20;

	const [ grid, setGrid ] = useState(createDefaultGrid());
	const [ plotPoint, setPlotPoint ] = useState({ y: null, x: null });

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
                    get fCost() { return this.gCost + this.hCost }
				});
			}
			defaultGrid.push(grid_row);
		}
        return defaultGrid;
    }
    
    function restGridContext() {
        setGrid(createDefaultGrid())
        setPlotPoint({ y: null, x: null })
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
                restGridContext
			}}
		>
			{props.children}
		</GridContext.Provider>
	);
};

export default GridContext;
