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

    changeDirection = () => {
        const arrayMovements = ['left', 'up', 'right', 'down'];
        const movement = Math.floor(Math.random() * 4)
        console.log(movement)
        this.setState({ direction: arrayMovements[movement] }, () => {
            console.log('movement: ', this.state.direction)
        })
    }

    componentDidMount () {
        this.changeDirectionInterval = setInterval(this.changeDirection,1000)
        this.moveInterval = setInterval(this.move, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.changeDirectionInterval);
        clearInterval(this.moveInterval);
    }

    move = () => {
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        const { direction } = this.state;
        const {topScoreboardHeight, border, size, step} = this.props;
        if (direction === 'right') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.min(currentLeft + step, window.innerWidth - border - size),
                },
                direction: 'right'
            });
        } else if (direction === 'down') {
            this.setState({
                position: {
                    top: currentTop + step,
                    top: Math.min(currentTop + step, window.innerHeight - size - border/2),
                    left: currentLeft
                },
                direction: 'down'
            });
        } else if (direction === 'left') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step, 5),
                },
                direction: 'left'
            });
        } else if (direction === 'up') {
            this.setState({
                position: {
                    top: Math.max(currentTop - step, 5),
                    left: currentLeft
                },
                direction: 'up'
            })
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