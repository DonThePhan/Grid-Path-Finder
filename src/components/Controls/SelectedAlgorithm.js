import AStarAlgorithm from '../Algorithms/AStar';
import DijkstraAlgorithm from '../Algorithms/Dijkstra';
import React, { useContext } from 'react';
import ControlContext from '../store/controlContext';

/** Applies whatever Algorithm is selected by the useState 'control' variable*/
export const SelectedAlgorithm = (props) => {
	const { algorithm } = useContext(ControlContext);

	let wrapper = undefined;
	if (algorithm === 'dijkstra') wrapper = <DijkstraAlgorithm>{props.children}</DijkstraAlgorithm>;
	else if (algorithm === 'aStar') wrapper = <AStarAlgorithm>{props.children}</AStarAlgorithm>;

	return <React.Fragment>{wrapper}</React.Fragment>;
};

export default SelectedAlgorithm;
