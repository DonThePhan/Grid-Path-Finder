import classes from './Button.module.css';
import { useContext } from 'react'
import ControlContext from '../store/controlContext';

function Button(props) {
    const { control } = useContext(ControlContext)
    const buttonClass = control === props.name ? classes.selected : ''
	return (
        <button className={`${classes.button} ${buttonClass}`} onClick={props.onClick} name={props.name}>
			{props.children}
		</button>
	);
}

export default Button;
