import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listProgramRoutines} from '../redux/actions/programActions'

//Import Components
import SearchBar from '../components/SearchBar'
import Routine from '../components/Routine'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function ProgramScreen() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const programRoutines = useSelector(state => state.programRoutines)
    const { error, loading, routines } = programRoutines

    useEffect(() => {

        dispatch(listProgramRoutines(id))

    }, [dispatch])

    return (
        <div className="screen-container">
            {/* <h3 className="page-title">{routines.name}</h3> */}

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
