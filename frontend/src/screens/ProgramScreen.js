import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

//Import Components
import SearchBar from '../components/SearchBar'
import Routine from '../components/Routine'

function ProgramScreen() {
    const { id } = useParams()

    const [routines, setRoutines] = useState([])

    useEffect(() => {

        async function fetchRoutines() {
            const { data } =  await axios.get(`/api/programs/${id}`)
            setRoutines(data)
        }

        fetchRoutines()

    }, [])

    return (
        <div className="screen-container">
            {/* <h3 className="page-title">{routines.name}</h3> */}

            <SearchBar/>

            <div className="card-container">
                {routines.map((routine) => (
                    // Render Routines
                    <Routine key={routine.id} routine={routine}/>
                ))}
            </div>
        </div>
    )
}

export default ProgramScreen
