import React, { useState, useContext, useEffect } from 'react';
import GridContext from '../store/gridContext';
import ControlContext from '../store/controlContext';

const DijkstraAlgorithm = (props) => {
	const { grid, setGrid, GRID_ROWS, GRID_COLS, setPlotPoint } = useContext(GridContext);
	const { control, setControl, startEnd } = useContext(ControlContext);

	const [ unvisited, setUnvisited ] = useState(null);
	// const [ visited, setVisited ] = useState([]);

	function createUnvisited() {
		const defaultUnvisited = [];

		for (let y of grid) {
			for (let cell of y) {
				if (cell.class === '' || cell.class === 'start-end-node') {
                    if (cell.vertex.toString() === startEnd.start.toString()) {
                         // starting node gets a shortest distance of zero
						cell.shrtstDis = 0;
					}
					defaultUnvisited.push(cell);
				}
			}
		}

		return defaultUnvisited;
	}

	function dijkstra() {
		setUnvisited((prevUnvisited) => {
			const newUnvisited = [
				...prevUnvisited.sort((a, b) => (a.shrtstDis > b.shrtstDis ? 1 : b.shrtstDis > a.shrtstDis ? -1 : 0))
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

			// setVisited((prevValue) => {
			// 	return [ ...prevValue, newUnvisited[0] ];
			// });

			newUnvisited.shift();
			return newUnvisited;
		});
	}

	function checkNeighbourCell(newGrid, y, x, neighbourY, neighbourX) {
		// If beyond grid limits, pass
		if (neighbourY < 0 || neighbourY >= GRID_ROWS || neighbourX < 0 || neighbourX >= GRID_COLS) {
			return newGrid;
		}

		if (newGrid[y][x].shrtstDis + 1 < newGrid[neighbourY][neighbourX].shrtstDis) {
			newGrid[neighbourY][neighbourX].shrtstDis = grid[y][x].shrtstDis + 1;
			newGrid[neighbourY][neighbourX].prevVertex = { y: y, x: x };
			return newGrid;
		}
		return newGrid;
	}

	useEffect(
		() => {
			console.log(control);
			if (control === 'solve') {
				if (unvisited === null) setUnvisited(createUnvisited());
				else if (unvisited.length === 0) return;
				else {
					setTimeout(dijkstra, 20);
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
export default DijkstraAlgorithm;
