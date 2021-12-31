import React from 'react'
import { Users, Programs, Routines, Exercises, Exercise_routines } from '../data'
// import '../static/styles/screens/WorkoutScreen/workoutscreen.css'

//Import Components
import SearchBar from '../components/SearchBar'
import Program from '../components/Program'

function WorkoutScreen() {
    return (
        <div class="screen-container">
            <h3 class="page-title">My Programs</h3>

            <SearchBar/>

            <div className="card-container">
                {/* render Program */}
                {Programs.map(program => (
                    <Program key={program.program_id} program={program}/>
                ))}
            </div>
        </div>
    )
}

export default WorkoutScreen
