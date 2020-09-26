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

    handlerKey = (event) => {
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        //here passed props (we have default props)
        const { step, border, size, topScoreboardHeight } = this.props;
        
        if (event.key === 'ArrowRight') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.min(currentLeft + step, window.innerWidth - border - size),
                },
                direction: 'right'
            });
        } else if (event.key === 'ArrowDown') {
            this.setState({
                position: {
                    top: currentTop + step,
                    top: Math.min(currentTop + step, window.innerHeight - size - border/2 - topScoreboardHeight),
                    left: currentLeft
                },
                direction: 'down'
            });
        } else if (event.key === 'ArrowLeft') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step, 5),
                },
                direction: 'left'
            });
        } else if (event.key === 'ArrowUp') {
            this.setState({
                position: {
                    top: Math.max(currentTop - step, 5),
                    left: currentLeft
                },
                direction: 'up'
            })
        }
      
        // 39 right
        // 40 down
        // 37 left
        // 38 up
    }

    constructor(props) {
        super(props);
        //create ref to pacman to use focus init
        this.pacmanRef = React.createRef();
    }

    componentDidMount () {
        this.pacmanRef.current.focus();
    }

    render() {
        const { direction, position } = this.state;
        return (
            <div 
                ref={this.pacmanRef}
                onKeyDown={this.handlerKey}
                className={`pacman pacman-${direction}`}
                tabIndex='0'
                style={position}
            >
                <PacmanSvg />
            </div>
        )
    }
}

Pacman.defaultProps = {
    //all in px;
    step: 50, 
    size: 50,
    border: 20,
    topScoreboardHeight: 50
}

export default Pacman;

