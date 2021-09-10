import classes from './Controls.module.css';
import Button from '../UI/Button';
import ControlContext from '../store/controlContext';
import React, { useContext, useState } from 'react';
import GridContext from '../store/gridContext';

function Controls() {
	const { controlButtonClick, resetControl, algorithm, setAlgorithm, setControl } = useContext(ControlContext);
	const { resetGridContext, createMaze } = useContext(GridContext);
	const [ hover, setHover ] = useState(false);

	function handleClick(e) {
		if (e.target.name === 'reset') {
			resetControl();
			resetGridContext();
        } else if (e.target.name === 'maze') {
            resetControl();
			createMaze();
		} else {
			controlButtonClick(e.target.name);
		}
	}

	function mouseOverDropdown() {
		setHover(true);
	}

	function mouseOffDropdown() {
		setHover(false);
	}

	function selectAlgorithm(algorithm) {
		setAlgorithm(algorithm);
		setHover(false);
	}

	return (
		<div className={classes.controls}>
			<Button onClick={handleClick} name="start-end-node">
				Start/End
			</Button>
			<Button onClick={handleClick} name="solve">
				Solve
			</Button>
			<Button onClick={handleClick} name="reset">
				Reset
			</Button>
			<Button onClick={handleClick} name="block">
				Block
			</Button>
			<Button onClick={handleClick} name="maze">
				Create Maze
			</Button>
			<div onMouseOver={mouseOverDropdown} onMouseLeave={mouseOffDropdown}>
				<div className={classes['dropdown-container']}>
					{(algorithm === 'dijkstra' || hover) && (
						<Button onClick={() => selectAlgorithm('dijkstra')} className={classes.dropdownbtn}>
							Dijkstra
						</Button>
					)}
					{(algorithm === 'aStar' || hover) && (
						<Button onClick={() => selectAlgorithm('aStar')} className={classes.dropdownbtn}>
							A*
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Controls;
