import React, { Component } from 'react';
import Pacman from '../Pacman';
import Ghost from '../Ghost'
import Food from '../Food'
import GameOver from '../GameOver'
import './style.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.pacmanRef = React.createRef();
        this.ghostRefRed = React.createRef();
        this.ghostRefBlue = React.createRef();
        this.ghostRefBlack = React.createRef();
        this.gameOverRef = React.createRef();

        const {foodSize, topScoreboardHeight} = this.props
        this.foods = []
        //calcute max food int
        this.amountFood = (
            (window.innerWidth - foodSize) 
            * (window.innerHeight - topScoreboardHeight)   
        ) / (foodSize * foodSize) - 1
        for(let i=0 ; i < this.amountFood; i++) {
            this['food-'+i] = React.createRef();
        }
    }

    componentDidMount() {
        this.intervalFood = setInterval(this.lookForEat, 5);
    }

    componentWillUnmount() {
        clearInterval(this.intervalFood);
    }

    lookForEat = () => {
        const blueGhostX = this.ghostRefBlue.current.state.position.left
        const blueGhostY = this.ghostRefBlue.current.state.position.top

        const redGhostX = this.ghostRefRed.current.state.position.left
        const redGhostY = this.ghostRefRed.current.state.position.top

        const blackGhostX = this.ghostRefBlack.current.state.position.left
        const blackGhostY = this.ghostRefBlack.current.state.position.top

        const pacmanX = this.pacmanRef.current.state.position.left;
        const pacmanY = this.pacmanRef.current.state.position.top;
        const pacmanSize = this.pacmanRef.current.props.size;
       
        const gameOver = this.gameOverRef.current
        if (
            (pacmanX === blueGhostX && pacmanY === blueGhostY)
            || (pacmanX === redGhostX && pacmanY === redGhostY)
            || (pacmanX === blackGhostX && pacmanY === blackGhostY)
            ) {
                gameOver.collision();
        }
        const lastPacmanX = pacmanX + pacmanSize / 2;
        const lastPacmanY = pacmanY + pacmanSize / 2;
        for(let i=0; i <= this.amountFood; i++) {
            const currentFood = this['food-'+i].current;
            if(currentFood) {
                const currentFoodX = currentFood.state.position.left;
                const currentFoodY = currentFood.state.position.top;
                const currentFoodSize = currentFood.props.size;

                const currentLastFoodX = currentFoodX + currentFoodSize / 2;
                const currentLastFoodY = currentFoodY + currentFoodSize / 2;

                if (
                    (pacmanX >= currentFoodX && pacmanX <= currentLastFoodX)
                    || (lastPacmanX >= currentFoodX && lastPacmanX <= currentLastFoodX)) {
                    if ((pacmanY >= currentFoodY && pacmanY <= currentLastFoodY)
                      || (lastPacmanY >= currentFoodY && lastPacmanY <= currentLastFoodY)) {
                      if (!currentFood.state.hidden) {
                        currentFood.ate();
                        this.props.setScore((value) => value + 1)
                      }
                    }
                }
            }
        }
    } 
    render () {
        const {foodSize, topScoreboardHeight} = this.props
        let foods = [];
        let currentTop = 0
        let currentLeft = 1 * foodSize;
        for (let i = 0; i < this.amountFood; i++) {
            if (currentLeft + foodSize >= window.innerWidth) {
                currentTop += foodSize;
                currentLeft = 0;
            }
            if (currentTop + foodSize >= (window.innerHeight - topScoreboardHeight)) {
                break;
            }
            const position = {left: currentLeft, top: currentTop};
            currentLeft += foodSize;
            foods.push(
                <Food 
                key={`food-elem-${i}`}
                ref={this['food-'+i]}
                position={position} />
            )
        }
        return (
            <div className="board">
                {foods}
                <GameOver ref={this.gameOverRef}/>
                <Pacman stop={this.gameOverRef} ref={this.pacmanRef}/>
                <Ghost position={{top: 500, left: 600}} stop={this.gameOverRef} ref={this.ghostRefRed} color="Red" />
                {/* <Ghost position={{top: 200, left: 100}} stop={this.gameOverRef} ref={this.ghostRefRed} color="Red" />
                <Ghost position={{top: 700, left: 350}} stop={this.gameOverRef} ref={this.ghostRefRed} color="Red" /> */}
                <Ghost position={{top: 100, left: 1600}} stop={this.gameOverRef} ref={this.ghostRefBlack} color="Black" />
                {/* <Ghost position={{top: 500, left: 100}} stop={this.gameOverRef} ref={this.ghostRefBlack} color="Black" />
                <Ghost position={{top: 650, left: 1100}} stop={this.gameOverRef} ref={this.ghostRefBlack} color="Black" /> */}
                <Ghost position={{top: 250, left: 700}} stop={this.gameOverRef} ref={this.ghostRefBlue} color="Blue"/>
                {/* <Ghost position={{top: 250, left: 1200}} stop={this.gameOverRef} ref={this.ghostRefBlue} color="Blue"/>
                <Ghost position={{top: 200, left: 400}} stop={this.gameOverRef} ref={this.ghostRefBlue} color="Blue"/> */}
                
            </div>
        )
    }
}  

Board.defaultProps = {
    //all in px;
    foodSize: 50,
    border: 20,
    topScoreboardHeight: 50
}

export default Board;