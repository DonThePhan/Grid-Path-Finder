import Row from './Row';
import './Grid.css';

function Grid(props) {

	return (
        <div className="grid">
            {props.grid.map((row) => {
                return <Row key={row[0].y} id={row[0].y} row={row}/>;
			})}
		</div>
	);
}

export default Grid;
