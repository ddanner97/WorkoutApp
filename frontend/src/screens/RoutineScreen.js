import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

//Import Components
import SearchBar from '../components/SearchBar'
import Exercise from '../components/Exercise'
import Header from '../components/Header';

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
            <Header/>

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
