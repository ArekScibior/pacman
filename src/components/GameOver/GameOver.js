import React, {Component} from 'react'
import './style.css';

class GameOver extends Component {
    state = {
        gameOver: false
    }

    constructor(props) {
        super(props)
        this.gameOverRef = React.createRef();
    }
    
    tryAgain = () => {
        window.location.href=window.location.href
    }
    collision() {
        this.setState({ gameOver: true });
    }

    render() {
        return (
            <div ref={this.gameOverRef} className={this.state.gameOver ? 'wrapper' : 'hide'}>
                <div className="gameOver">
                    <div className="headerInfo">Game Over</div>
                    <button onClick={this.tryAgain}>Try again</button>
                </div>
            </div>
        )
    }
}

GameOver.defaultProps = {
    score: 0
};

export default GameOver;