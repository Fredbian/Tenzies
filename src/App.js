import React, { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    // check win game conditions that every time dice changes
    // Option 1 ---- use for loop
    // useEffect(() => {
    //     // check all is held
    //     let allIsHeld = true
    //     function checkAllIsHeld() {
    //         for (let i = 0; i < dice.length; i++) {
    //             if (dice[i].isHeld !== true) {
    //                return allIsHeld = false
    //             }
    //         }
    //     }
    //     checkAllIsHeld()

    //     //check all values are same
    //     let allValueIsEqual = true
    //     function checkAllValue() {
    //         const firstValue = dice[0].value
    //         for (let i = 0; i < dice.length; i++) {
    //             if (dice[i].value !== firstValue) {
    //                 return allValueIsEqual = false
    //             }
    //         }
    //     }
    //     checkAllValue()

    //     if (allIsHeld && allValueIsEqual) {
    //         setTenzies(true)
    //         alert('You Win!')
    //     }

    // }, [dice])

    //Option 2 ----- use every() array method
    useEffect(() => {
        const allIsHeld = dice.every((die) => die.isHeld === true)
        const firstValue = dice[0].value
        const allValueIsEqual = dice.every((die) => die.value === firstValue)
        if (allIsHeld && allValueIsEqual) {
            setTenzies(true)
            console.log('You Win!')
        }
    }, [dice])


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
        // Option 1 --- use map() array method
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
        if (!tenzies) {
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
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
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

        // Option 2 ------ use map() array method
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
            {tenzies && <Confetti />}
            <div className="container">
                <div className="game">
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
                    {die}
                    <button className='btn' onClick={rollDice}>{tenzies ? 'New Game' : "Roll"}</button>
                </div>
            </div>
        </main>
    )
}
