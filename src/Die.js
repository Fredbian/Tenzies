import React from 'react'

export default function Die(props) {
    return (
        <div
            className={props.isHeld ? 'die held' : 'die'}
            onClick={() => props.holdDice( props.id)}
        >
            {props.value}
        </div>
    )
}