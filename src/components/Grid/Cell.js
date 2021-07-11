// import {useState} from 'react'
import './Cell.css';
import ControlContext from '../store/controlContext';
import { useContext } from 'react';

function Cell(props) {
    const { overCell, setMouseDown, startEnd } = useContext(ControlContext)
    
    /** icons for the start & end nodes */
    let mark = ''
    if (props.cell.y === startEnd.start[0] && props.cell.x === startEnd.start[1]) {
        mark = <i className="fas fa-star"></i>
    } else if (props.cell.y === startEnd.end[0] && props.cell.x === startEnd.end[1]) {
        mark = <i className="fas fa-flag"></i>
    } else if (props.cell.class === 'path') {
        // mark = <p>*</p>
    }

	return (
		<div
			onMouseEnter={() => overCell(props.cell)}
			className="cell"
			onMouseDown={() => {
				setMouseDown(true);
				overCell(props.cell, true);
			}}
			onMouseUp={() => setMouseDown(false)}
		>
            <div className={`inside ${props.cell.class}`}>{mark }</div>
		</div>
	);
}

export default Cell;
