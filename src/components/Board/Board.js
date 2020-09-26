import React, { Component } from 'react';
import Pacman from '../Pacman';
import './style.css';

class Board extends Component {
    render () {
        return (
            <div className="board">
                {/* <Food /> */}
                <Pacman />
                {/* <Goast />
                <Goast />
                <Goast />
                 */}
            </div>
        )
    }
}  

export default Board;