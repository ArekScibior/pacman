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

    render() {
        return (
            <div 
                className='pacman'
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

