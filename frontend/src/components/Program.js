import React from 'react'
import { Link } from 'react-router-dom'

function Program({ program }) {
    return (
        <Link to={`/program/${program.program_id}`} style={{ textDecoration: 'none' }}>
            <div>
                <h3>{program.name}</h3> 
            </div>
        </Link>
    )
}

export default Program
