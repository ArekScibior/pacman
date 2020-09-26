import React, { Component } from 'react';
import {ReactComponent as GhostSvg} from '../../assets/ghost.svg';
import './style.css';

class Ghost extends Component {
    state = {
        direction: 'left',
        position: this.props.position
    }

    changeDirection = () => {
        const arrayMovements = ['left', 'up', 'right', 'down'];
        const movement = Math.floor(Math.random() * 4)
        this.setState({ direction: arrayMovements[movement] }, () => {
        })
    }

    componentDidMount () {
        this.changeDirectionInterval = setInterval(this.changeDirection,1500)
        this.moveInterval = setInterval(this.move, 1500)
    }
    componentWillUnmount() {
        clearInterval(this.changeDirectionInterval);
        clearInterval(this.moveInterval);
    }

    move = () => {
        const stop = this.props.stop
        if (stop && stop.current.state.gameOver) {
            clearInterval(this.changeDirectionInterval);
            clearInterval(this.moveInterval);
            return
        }
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        const { direction } = this.state;
        const {topScoreBoardHeight, border, size, step} = this.props;
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
                    top: Math.min(currentTop + step, window.innerHeight - size - border - topScoreBoardHeight),
                    left: currentLeft
                },
                direction: 'down'
            });
        } else if (direction === 'left') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step, 0),
                },
                direction: 'left'
            });
        } else if (direction === 'up') {
            this.setState({
                position: {
                    top: Math.max(currentTop - step, 0),
                    left: currentLeft
                },
                direction: 'up'
            })
        }
    }

    constructor(props) {
        super(props);
        //create ref to pacman to use focus init
        const name = 'ghostRef' + props.color
        this[name] = React.createRef();
    }

    render () {
        const { position } = this.state;
        const { color } = this.props
        return (
            <div
                style={position} 
                className="ghost">
               <GhostSvg className={`ghost${color}`}/>
            </div>
        )
    }
} 

Ghost.defaultProps = {
    //all in px;
    color: 'red',
    position: {top: 100, left: 150},
    step: 50, 
    size: 50,
    border: 20,
    topScoreBoardHeight: 50,
}

export default Ghost;