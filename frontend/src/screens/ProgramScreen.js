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
import Header from '../components/Header';

function ProgramScreen() {
    //Get state
    let state = {...store.getState()}
    const userId = state.userLogin.userInfo.id

    //Get id passed - program id which is then passed into action and used in axios call
    const { id } = useParams()
    const program_id = id

    const dispatch = useDispatch()

    const programRoutines = useSelector(state => state.programRoutines)
    const { error, loading, routines } = programRoutines

    useEffect(() => {

        dispatch(listProgramRoutines(userId, program_id))

    }, [dispatch])

    // Get Program Name for display *Has to be a better way to do this such as passing in prop*
    let programName = ''

    for (let i = 0; i < state.programList.programs.length; i++){

        if (id == state.programList.programs[i].id) {
            programName = state.programList.programs[i].name
        }
    }

    return (
        <div className="screen-container">
            <Header/>

            <h1>{programName}</h1>

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
