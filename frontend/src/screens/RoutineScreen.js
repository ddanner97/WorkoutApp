import React from 'react'
import { useParams } from 'react-router'
import { Users, Programs, Routines, Exercises, Exercise_routines } from '../data'

//Import Components
import SearchBar from '../components/SearchBar'
import Exercise from '../components/Exercise'

function RoutineScreen() {
    const { id } = useParams()
    const exercises = Exercises.filter((e) => {return Exercise_routines.filter((e) => e.routine_id === id) })
    const routine = Routines.find((p) => { return p.routine_id === id})

    console.log(exercises)

    return (
        <div class="screen-container">
            <h3 class="page-title">{routine.routine_name}</h3>

            <SearchBar/>

            <div className="card-container">
                {exercises.map((exercise) => (
                    // Render Routines
                    <Exercise key={exercise.exercise_id} exercise={exercise}/>
                ))}
            </div>
        </div>
    )
}

export default RoutineScreen
