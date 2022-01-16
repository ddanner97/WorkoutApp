import React, { useState, useEffect } from 'react'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listPrograms } from '../redux/actions/programActions'

//Import Components
import SearchBar from '../components/SearchBar'
import Program from '../components/Program'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function HomeScreen() {
    const dispatch = useDispatch()

    const programList = useSelector(state => state.programList)
    const { error, loading, programs } = programList

    useEffect(() => {

        dispatch(listPrograms())

    }, [dispatch])

    return (
        <div className="screen-container">
            <h1 className="page-title">My Programs</h1>

            <SearchBar/>

            { loading ? <Loader/>
                : error ? <ErrorMessage>{error}</ErrorMessage>
                    :
                    <div className="card-container">
                        {/* render Program */}
                        {programs.map(program => (
                            <Program key={program.id} program={program}/>
                        ))}
                    </div>

            }
        </div>
    )
}

export default HomeScreen
