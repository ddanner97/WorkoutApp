import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import store from '../redux/store';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listProgramRoutines } from '../redux/actions/programActions'

//Import Components
import SearchBar from '../components/SearchBar'
import Routine from '../components/Routine'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function ProgramScreen() {
    //Get state
    let state = {...store.getState()}

    //Get id passed
    const { id } = useParams()

    const dispatch = useDispatch()

    const programRoutines = useSelector(state => state.programRoutines)
    const { error, loading, routines } = programRoutines

    useEffect(() => {

        dispatch(listProgramRoutines(id))

    }, [dispatch])

    //Get program name
    const program_name = get_program(id)

    function get_program (id) {
        const programs = state.programList.programs

        for (let i in programs) {
            if (programs[i].id == id){
                return programs[i]
            }
        }

    }

    return (
        <div className="screen-container">
            {/* <h2 className="page-title">{program_name.name}</h2> */}

            <SearchBar/>

            { loading ? <Loader/>
                : error ? <ErrorMessage>{error}</ErrorMessage>
                    :
                    <div className="card-container">
                        {routines.map((routine) => (
                            // Render Routines
                            <Routine key={routine.id} routine={routine}/>
                        ))}
                    </div>
            }
        </div>
    )
}

export default ProgramScreen
