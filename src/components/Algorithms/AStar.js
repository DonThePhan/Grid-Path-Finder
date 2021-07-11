/** This code is built on top of Dijkstra with just a few modifications */

import React, { useState, useContext, useEffect } from 'react';
import GridContext from '../store/gridContext';
import ControlContext from '../store/controlContext';

const AStarAlgorithm = (props) => {
	const { grid, setGrid, GRID_ROWS, GRID_COLS, setPlotPoint } = useContext(GridContext);
	const { control, setControl, startEnd } = useContext(ControlContext);

	const [ unvisited, setUnvisited ] = useState(null);

	function createUnvisited() {
        const defaultUnvisited = [];
        
        /**gCost is distance to start, 
         * hCost is distance to end 
         * fCost is gCost + hCost*/

		for (let y of grid) {
            for (let cell of y) {
                
                cell.gCost = Infinity
                cell.hCost = Math.abs(startEnd.end[0] - cell.y) + Math.abs(startEnd.end[1] - cell.x)
                
                if (cell.class === '' || cell.class === 'start-end-node') {
                    // give the starting node a gCost of zero
					if (cell.vertex.toString() === startEnd.start.toString()) {
						cell.gCost = 0;
					}
					defaultUnvisited.push(cell);
				}
			}
		}

		return defaultUnvisited;
	}

	function aStar() {
		setUnvisited((prevUnvisited) => {
			const newUnvisited = [
				...prevUnvisited.sort((a, b) => (a.fCost > b.fCost ? 1 : b.fCost > a.fCost ? -1 : 0))
			];
			let [ y, x ] = newUnvisited[0].vertex;

			setGrid((prevGrid) => {
				let newGrid = [ ...prevGrid ];
				newGrid = checkNeighbourCell(newGrid, y, x, y - 1, x);
				newGrid = checkNeighbourCell(newGrid, y, x, y + 1, x);
				newGrid = checkNeighbourCell(newGrid, y, x, y, x - 1);
				newGrid = checkNeighbourCell(newGrid, y, x, y, x + 1);

				if (newGrid[y][x].class === '') {
					newGrid[y][x].class = 'visited';
				}

				if (y === startEnd.end[0] && x === startEnd.end[1]) {
					setControl('plotLine');
					setPlotPoint({ ...newGrid[y][x].prevVertex });
				}

				return newGrid;
			});

			newUnvisited.shift();
			return newUnvisited;
		});
	}

	function checkNeighbourCell(newGrid, y, x, neighbourY, neighbourX) {
		// If beyond grid limits, pass
		if (neighbourY < 0 || neighbourY >= GRID_ROWS || neighbourX < 0 || neighbourX >= GRID_COLS) {
			return newGrid;
		}

		if (newGrid[y][x].gCost + 1 < newGrid[neighbourY][neighbourX].gCost) {
			newGrid[neighbourY][neighbourX].gCost = grid[y][x].gCost + 1;
			newGrid[neighbourY][neighbourX].prevVertex = { y: y, x: x };
			return newGrid;
		}
		return newGrid;
	}

	useEffect(
		() => {
			if (control === 'solve') {
				if (unvisited === null) setUnvisited(createUnvisited());
				else if (unvisited.length === 0) return;
				else {
					setTimeout(aStar, 20);
				}
			}

			if (control === 'start-end-node') {
				setUnvisited(null);
			}
		},
		[ control, unvisited ]
	);

	return <React.Fragment>{props.children}</React.Fragment>;
};

/**This Component is fully contained & simply needs to be used as a wrapper to function (I've wrapped it in index.js under 'SelectedAlgorithm' component) */
export default AStarAlgorithm;
