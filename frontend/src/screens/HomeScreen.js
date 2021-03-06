import React, { useState, useEffect } from 'react'

/* REACT ROUTER */
import {useNavigate} from "react-router-dom";

// Import Style
import '../static/styles/screens/HomeScreen/homeScreen.css';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listPrograms, deleteProgram } from '../redux/actions/programActions'
import store from '../redux/store';

//Import Components
import SearchBar from '../components/SearchBar'
import Program from '../components/Program'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';


function HomeScreen() {
    const history = useNavigate();

    const state = {...store.getState()}
    const { userInfo } = state.userLogin
    const userId = state.userLogin.userInfo.id

    const dispatch = useDispatch()

    const programList = useSelector(state => state.programList)
    const { error, loading, programs } = programList

    const programDelete = useSelector(state => state.programList)
    const { error:errorDelete, loading:loadingDelete, success:successDelete } = programDelete

    useEffect(() => {

        dispatch(listPrograms(userId))

    }, [dispatch, userInfo, successDelete])

    const deleteHandler = (program_id) => {

        if (window.confirm('Are you sure you want to delete this program?')) {
            // delete program
            console.log(program_id)
            dispatch(deleteProgram(program_id))
        }
    }

    const updateProgram = (program_id) => {
        
        const redirect = `/program/${program_id}/edit`
        history(redirect)

    }

    return (
        <div className="screen-container">
            <Header/>

            <h1>My Programs</h1>

            <SearchBar/>

            {/* Delete loader and error message */}
            {loadingDelete && <Loader />}
            {errorDelete && <ErrorMessage variant='danger>'>{errorDelete}</ErrorMessage>}

            {/* Ternary operator: If loading == True render loading, If error == render error, else render page */}
            { loading ? <Loader/> 
                : error ? <ErrorMessage>{error}</ErrorMessage>
                    :
                    <div className="program-card-container">
                        {/* render Program */}
                        {programs.map(program => (
                            <div className='program-card' key={program.id}>
                                <Program key={program.id} program={program}/>
                                <div className="button-container">
                                    <button id={program.id} onClick={(e) => deleteHandler(e.target.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <button id={program.id} onClick={(e) => updateProgram(e.target.id)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default HomeScreen
