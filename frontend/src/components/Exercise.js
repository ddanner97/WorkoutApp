import React from 'react'
import { Link } from 'react-router-dom'

function Exercise({ exercise }) {
    return (
        <div style={{ textDecoration: 'none' }}>
            <div>
                <h3>{exercise.name} </h3>
            </div>
        </div>
    )
}

export default Exercise
