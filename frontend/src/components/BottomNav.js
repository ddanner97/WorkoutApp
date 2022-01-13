import React from 'react'
import '../static/styles/components/BottomNav/navbar.css'

import { Link } from 'react-router-dom'

function BottomNav() {
    return (
        <div className="navbar">
            <Link to={'/history'}><i className="fas fa-solid fa-chart-area"></i></Link>
            <Link to={'/'}><i className="fas fa-solid fa-dumbbell"></i></Link>
            <Link to={'/add-workout'}><i className="fas fa-solid fa-plus"></i></Link>
        </div>
    )
}

export default BottomNav
