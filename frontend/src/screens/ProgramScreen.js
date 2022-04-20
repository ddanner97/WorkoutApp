import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import store from '../redux/store';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listProgramDetails, listProgramRoutines } from '../redux/actions/programActions'

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

    const programDetails = useSelector(state => state.programDetails)
    const { detailError, detailLoading, program } = programDetails

    useEffect(() => {

        dispatch(listProgramDetails(program_id))
        dispatch(listProgramRoutines(userId, program_id))

    }, [dispatch, program_id])

    return (
        <div className="screen-container">
            <Header/>

            { detailLoading ? <Loader/>
                : detailError ? <ErrorMessage>{detailError}</ErrorMessage>
                    :
                    <h1>{program.name}</h1>
            }

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
