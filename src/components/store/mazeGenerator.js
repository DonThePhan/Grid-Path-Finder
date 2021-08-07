function mazeGenerator(GRID_ROWS, GRID_COLS) {
	let pathingOrder = [];
	//check of overlap
	function inList(nodeToCheck, nodeSet, operation) {
		for (let node of nodeSet) {
			// console.log(operation, nodeSet);
			if (nodeToCheck[0] === node[0] && nodeToCheck[1] === node[1]) {
				return true;
			}
		}
		return false;
	}

	function createDefaultGrid() {
		const defaultGrid = [];

		for (let y = 0; y < GRID_ROWS; y++) {
			const grid_row = [];
			for (let x = 0; x < GRID_COLS; x++) {
				if (y % 2 === 1) {
					grid_row.push(1);
				} else if (x % 2 === 1) {
					grid_row.push(1);
				} else {
					grid_row.push(0);
				}
			}
			defaultGrid.push(grid_row);
		}
		return defaultGrid;
	}

	//check options for up, down, left & right
	function findOptions(currentNode, currentNodes) {
		const options = [];
		const up = [ currentNode[0] - 2, currentNode[1] ];
		if (!inList(up, currentNodes, 'find options') && up[0] >= 0) {
			options.push(up);
		}
		const down = [ currentNode[0] + 2, currentNode[1] ];
		if (!inList(down, currentNodes, 'find options') && down[0] < GRID_ROWS) {
			options.push(down);
		}
		const left = [ currentNode[0], currentNode[1] - 2 ];
		if (!inList(left, currentNodes, 'find options') && left[1] >= 0) {
			options.push(left);
		}
		const right = [ currentNode[0], currentNode[1] + 2 ];
		if (!inList(right, currentNodes, 'find options') && right[1] < GRID_COLS) {
			options.push(right);
		}
		return options;
	}

	const grid = createDefaultGrid();

	// All AVAILABLE NODES
	let isoNodes = [];
	for (let y = 0; y < GRID_ROWS; y++) {
		for (let x = 0; x < GRID_COLS; x++) {
			if (grid[y][x] === 0) {
				isoNodes.push([ y, x ]);
			}
		}
	}

	// START CONNECTED NODE NETWORK (list)
	let nodeNetwork = isoNodes.splice(Math.floor(Math.random()* isoNodes.length), 1); //TODO will make this random

	let nodesPath;

	//while isolated node remain
	while (isoNodes.length > 0) {
		nodesPath = [];

		//randomly pick an available node & put it in nodesPath & also remove it from isolated nodes
		let newNode = isoNodes.splice(Math.floor(Math.random() * isoNodes.length), 1)[0];
		nodesPath.push(newNode);

		// console.log('\nstartingNode', newNode);

		while (true) {
			let nextNode = [];
			let options = [];

			// check available nodes (what's 1 - physically possible & 2 - not overlapping current path)
			options = findOptions(newNode, nodesPath);

			// if there is a loop in path, pick new node inside loop instead
			while (options.length === 0) {
				newNode = nodesPath[Math.floor(Math.random() * nodesPath.length)];
				nodesPath.push(newNode);
				options = findOptions(newNode, nodesPath);
			}

			//pick direction
			nextNode = options[Math.floor(Math.random() * options.length)];
			isoNodes = isoNodes.filter((node) => {
				if (node[0] === nextNode[0] && node[1] === nextNode[1]) {
					return false;
				}
				return true;
			});

			// Exit loop when connection found (check if next node is a Network node)
			let clearedY = (newNode[0] + nextNode[0]) / 2;
			let clearedX = (newNode[1] + nextNode[1]) / 2;
			if (inList(nextNode, nodeNetwork, 'check if connected')) {
				pathingOrder = [ ...pathingOrder, [ clearedY, clearedX ] ];

				grid[clearedY][clearedX] = 0;

				// console.log('-------------- nodesPath', nodesPath);
				// for (let row of grid) {
				// 	console.log(row);
				// }

				nodeNetwork = [ ...nodeNetwork, ...nodesPath ];
				break;
			} else {
				pathingOrder = [ ...pathingOrder, [ clearedY, clearedX ] ];

                nodesPath.push(nextNode);
                
				grid[clearedY][clearedX] = 0;
				newNode = nextNode;
			}
		}
	}

	// console.log(pathingOrder);

	return { grid, pathingOrder, defaultGrid: createDefaultGrid(), startingNode: nodeNetwork[0] };
}

export default mazeGenerator;
