import React from 'react'
import { Link } from 'react-router-dom'

function Exercise({ exercise }) {
    return (
        <Link to={`exercise/${exercise.id}`} style={{ textDecoration: 'none' }}>
            <div>
                <h3>{exercise.name} </h3>
            </div>
        </Link>
    )
}

export default Exercise
