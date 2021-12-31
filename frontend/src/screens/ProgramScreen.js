import React from 'react'
import { useParams } from 'react-router'
import { Users, Programs, Routines, Exercises, Exercise_routines } from '../data'

//Import Components
import SearchBar from '../components/SearchBar'
import Routine from '../components/Routine'

function ProgramScreen() {
    const { id } = useParams()
    const routines = Routines.filter((e) => { return e.program_id === id})
    const program = Programs.find((p) => { return p.program_id === id})

    return (
        <div class="screen-container">
            <h3 class="page-title">{program.name}</h3>

            <SearchBar/>

            <div className="card-container">
                {routines.map((routine) => (
                    // Render Routines
                    <Routine key={routine.routine_id} routine={routine}/>
                ))}
            </div>
        </div>
    )
}

export default ProgramScreen
