import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import '../static/styles/screens/WorkoutScreen/workoutscreen.css'

//Import Components
import SearchBar from '../components/SearchBar'
import Program from '../components/Program'

function HomeScreen() {
    const [programs, setPrograms] = useState([])

    useEffect(() => {

        async function fetchPrograms() {
            const { data } =  await axios.get('/api/programs/')
            setPrograms(data)
        }

        fetchPrograms()

    }, [])

    return (
        <div className="screen-container">
            <h3 className="page-title">My Programs</h3>

            <SearchBar/>

            <div className="card-container">
                {/* render Program */}
                {programs.map(program => (
                    <Program key={program.id} program={program}/>
                ))}
            </div>
        </div>
    )
}

export default HomeScreen
