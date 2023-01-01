import React, { useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'

export default function App() {

    const [dice, setDice] = useState(allNewDice())

    // create a random num function to return an array that hold 10 nums between 1-6
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    const handleClick = () => {
        setDice(allNewDice())
    }
    
    function holdDice(id) {
        // console.log(id)
        setDice(prevDice => {
            const newArray = []
            for (let i = 0; i < prevDice.length; i++) {
                if (prevDice[i].id === id) {
                    const updatedDice = {
                        ...prevDice[i],
                        isHeld: !prevDice[i].isHeld

                    }
                    newArray.push(updatedDice)
                } else {
                    newArray.push(prevDice[i])
                }
            }
            return newArray
        })
    }

    const die = dice.map((item) => {
        return (
            <Die key={item.id} id={item.id} value={item.value} isHeld={item.isHeld} holdDice={holdDice} />
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
