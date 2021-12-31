import React from 'react'
import '../static/styles/components/BottomNav/navbar.css'

import { Link } from 'react-router-dom'

function BottomNav() {
    return (
        <div class="navbar">
            <Link to={'/history'}><i class="fas fa-solid fa-chart-area"></i></Link>
            <Link to={'/'}><i class="fas fa-solid fa-dumbbell"></i></Link>
            <Link to={'/add-workout'}><i class=" fas fa-solid fa-plus"></i></Link>
        </div>
    )
}

export default BottomNav
