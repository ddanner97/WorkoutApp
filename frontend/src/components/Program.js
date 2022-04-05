import React from 'react'
import { Link } from 'react-router-dom'

function Program({ program }) {

    return (
        <Link to={`/program/${program.id}`} style={{ textDecoration: 'none' }}>
            <h3>{program.name}</h3>    
        </Link>
    )
}

export default Program
