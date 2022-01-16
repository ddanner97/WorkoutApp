import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

//Import Components
import SearchBar from '../components/SearchBar'
import Exercise from '../components/Exercise'

function RoutineScreen() {
    const { id } = useParams()
  
    const [exercises, setExercises] = useState([])

    useEffect(() => {

        async function fetchExercises() {
            const { data } =  await axios.get(`/api/programs/${id}/routine/${id}`)
            // console.log(data)
            setExercises(data)
        }

        fetchExercises()

    }, [])

    return (
        <div className="screen-container">
            {/* <h3 className="page-title">{routine.routine_name}</h3> */}

            <SearchBar/>

            <div className="card-container">
                {exercises.map((exercise) => (
                    // Render Routines
                    <Exercise key={exercise.id} exercise={exercise}/>
                ))}
            </div>
        </div>
    )
}

export default RoutineScreen
