import React, { useState, useEffect } from 'react'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listPrograms } from '../redux/actions/programActions'

//Import Components
import SearchBar from '../components/SearchBar'
import Program from '../components/Program'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import store from '../redux/store';
import Header from '../components/Header';
;


function HomeScreen() {
    const state = {...store.getState()}
    const userId = state.userLogin.userInfo.id

    const dispatch = useDispatch()

    const programList = useSelector(state => state.programList)
    const { error, loading, programs } = programList

    useEffect(() => {

        dispatch(listPrograms(userId))

    }, [dispatch])

    return (
        <div className="screen-container">
            <Header/>

            <h1>My Programs</h1>

            <SearchBar/>

            {/* Ternary operator: If loading == True render loading, If error == render error, else render page */}
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
