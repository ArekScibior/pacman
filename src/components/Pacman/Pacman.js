import React, { Component } from 'react'
import './style.css';
import {ReactComponent as PacmanSvg} from '../../assets/pacman.svg';
class Pacman extends Component {

    state = {
        direction: 'right',

        position: {
            top: 5,
            left: 5,
        }
    }

    handlerKeyDown = (event) => {
        console.log(event.keyCode, event.key);
    }

    constructor(props) {
        super(props);
        //create ref to pacman
        this.pacmanRef = React.createRef();
    }

    componentDidMount () {
        this.pacmanRef.current.focus();
    }

    render() {
        return (
            <div 
                ref={this.pacmanRef}
                onKeyDown={this.handlerKeyDown}
                className='pacman'
                tabIndex='0'
                style={this.state.position}
            >
                <PacmanSvg />
            </div>
        )
    }
}

Pacman.defultProps = {
    //all in px;
    step: 50, 
    size: 50,
    border: 20,
    topScoreboardHeight: 50
}

export default Pacman;

