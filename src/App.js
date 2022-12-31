import React, { useEffect, useState } from 'react'
import Die from './Die'

export default function App() {

    const [dice, setDice] = useState(allNewDice())

    // create a random num function to return an array that hold 10 nums between 1-6
    function allNewDice() {
        const array = []
        for (let i = 0; i < 10; i++) {
            array.push(Math.ceil(Math.random() * 6))
        }
         return(array)
    }

    const handleClick = () => {
        const array = []
        for (let i = 0; i < 10; i++) {
            array.push(Math.ceil(Math.random() * 6))
        }
         setDice(array)
    }
    

    const die = dice.map((item, index) => {
        return (
            <Die key={index} value={item} />
        )
    })


    return (
        <main>
            <div className="container">
                <div className="game">
                    {die}
                    <button className='btn' onClick={handleClick}>Roll</button>
                </div>
            </div>
        </main>
    )
}
