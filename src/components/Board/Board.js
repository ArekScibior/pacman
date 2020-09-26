import React, { Component } from 'react';
import Pacman from '../Pacman';
import Ghost from '../Ghost'
import Food from '../Food'
import './style.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.pacmanRef = React.createRef();

        const {foodSize, topScoreboardHeight} = this.props
        this.foods = []
        //calcute max food int
        this.amountFood = (
            (window.innerWidth - foodSize) 
            * (window.innerHeight - topScoreboardHeight)   
        ) / (foodSize * foodSize) - 1
        //console.log(window.innerWidth - foodSize)
        console.log(window.innerHeight - topScoreboardHeight)
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
        const pacmanX = this.pacmanRef.current.state.position.left;
        const pacmanY = this.pacmanRef.current.state.position.top;
        const pacmanSize = this.pacmanRef.current.props.size;

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
        const {foodSize, border, topScoreboardHeight} = this.props
        let foods = [];
        let currentTop = 0
        let currentLeft = 1 * foodSize;
        console.log(this.amountFood)
        for (let i = 0; i < this.amountFood; i++) {
            if (currentLeft + foodSize >= window.innerWidth - border) {
                currentTop += foodSize;
                currentLeft = 0;
            }
            if (currentTop + foodSize >= (window.innerHeight - topScoreboardHeight - border)) {
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
                <Pacman ref={this.pacmanRef}/>
                <Ghost color="red" />
                <Ghost color="black" />
                <Ghost color="blue"/>
                
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