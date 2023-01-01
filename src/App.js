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

    // the function handle click on 'Roll' button
    const rollDice = () => {
        // Option 1 --- use map() method
        // setDice(prevDice => prevDice.map((die) => {
        //     return die.isHeld ? 
        //         die :
        //         {
        //             value: Math.ceil(Math.random() * 6),
        //             isHeld: false,
        //             id: nanoid() 
        //         }
        // }))

        // Option 2 --- use for loop
        setDice(prevDice => {
            const newArray =[]
            for (let i = 0; i < prevDice.length; i++) {
                if (prevDice[i].isHeld === true) {
                    newArray.push(prevDice[i])
                } else {
                    newArray.push({
                        value: Math.ceil(Math.random() * 6),
                        isHeld: false,
                        id: nanoid()
                    })
                }
            }
            return newArray
        })
    }

    function holdDice(id) {

        // console.log(id)
        // Option 1 ------ use for loop
        // setDice(prevDice => {
        //     const newArray = []
        //     for (let i = 0; i < prevDice.length; i++) {
        //         if (prevDice[i].id === id) {
        //             const updatedDice = {
        //                 ...prevDice[i],
        //                 isHeld: !prevDice[i].isHeld

        //             }
        //             newArray.push(updatedDice)
        //         } else {
        //             newArray.push(prevDice[i])
        //         }
        //     }
        //     return newArray
        // })

        // Option 2 ------ use map() method
        setDice(prevDice => prevDice.map((die) => {
            return die.id === id ?
                {
                    ...die,
                    isHeld: !die.isHeld
                } :
                die
        }))
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
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
                    {die}
                    <button className='btn' onClick={rollDice}>Roll</button>
                </div>
            </div>
        </main>
    )
}
