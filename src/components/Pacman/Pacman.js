import React, { Component } from 'react'
import './style.css';
import {ReactComponent as PacmanSvg} from '../../assets/pacman.svg';
class Pacman extends Component {

    state = {
        direction: 'right',
        position: {
            top: 0,
            left: 0,
        }
    }

    handlerKey = (event) => {
        const currentTop = this.state.position.top;
        const currentLeft = this.state.position.left;
        //here passed props (we have default props)
        const { step, border, size, topScoreboardHeight } = this.props;
        
        if (event.key === 'ArrowRight') {
            let left = ''
            if (currentLeft + step > window.innerWidth - border - size) {
                left = currentLeft
            } else {
                left = currentLeft + step
            }

            this.setState({
                position: {
                    top: currentTop,
                    left: left,
                },
                direction: 'right'
            });
        } else if (event.key === 'ArrowDown') {
            let top = ''
            if (currentTop + step > window.innerHeight - size - border - topScoreboardHeight) {
                top = currentTop
            } else {
                top = currentTop + step
            }

            this.setState({
                position: {
                    top: top,
                    left: currentLeft
                },
                direction: 'down'
            });
        } else if (event.key === 'ArrowLeft') {
            this.setState({
                position: {
                    top: currentTop,
                    left: Math.max(currentLeft - step, 0),
                },
                direction: 'left'
            });
        } else if (event.key === 'ArrowUp') {
            this.setState({
                position: {
                    top: Math.max(currentTop - step, 0),
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

