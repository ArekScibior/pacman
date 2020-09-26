import React, { Component } from 'react';
import {ReactComponent as GhostSvg} from '../../assets/ghost.svg';
import './style.css';

class Ghost extends Component {
    state = {
        direction: 'left',
        position: {
            top: 50 * 3,
            left: 50 * 3
        }
    }
    render () {
        const { direction, position } = this.state;
        const { color } = this.props
        return (
            <div 
                style={position} 
                className="ghost">
               <GhostSvg className={`ghost-${color}`}/>
            </div>
        )
    }
} 

Ghost.defaultProps = {
    //all in px;
    color: 'red',
    step: 50, 
    size: 50,
    border: 20,
    topScoreboardHeight: 50
}

export default Ghost;