import Cell from './Cell';
import './Row.css'

function Row(props) {

	return (
		<div className='row'>
            {props.row.map((cell) => {
                return <Cell key={cell.x} id={cell.x} cell={cell}/>;
			})}
		</div>
	);
}

export default Row;
