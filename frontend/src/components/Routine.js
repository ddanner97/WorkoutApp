import React from 'react'
import { Link } from 'react-router-dom'


function Routine({ routine }) {
    return (
        <Link to={`routine/${routine.routine_id}`} style={{ textDecoration: 'none' }}>
            <div>
                <h3>{routine.routine_name}</h3>
            </div>
        </Link>
    )
}

export default Routine
