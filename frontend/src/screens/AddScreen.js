import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router"

/* REACT ROUTER */
import { Link, Navigate, useNavigate} from "react-router-dom";

// Import Components
import Header from '../components/Header';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listPrograms, createProgram } from '../redux/actions/programActions'
import { PROGRAM_CREATE_RESET } from '../redux/constants/programConstants';
import store from '../redux/store';

//Component Imports
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function AddScreen({ }) {
    const history = useNavigate();

    // Get userID
    const state = {...store.getState()}
    const { userInfo } = state.userLogin
    const userId = state.userLogin.userInfo.id

    const dispatch = useDispatch()

    // List of Programs
    const programList = useSelector(state => state.programList)
    const { error, loading, programs } = programList

    // Program create
    const programCreate = useSelector(state => state.programCreate)
    const { error: errorCreate, loading: loadingCreate, success: successCreate, program: createdProgram } = programCreate

    // Get program action
    useEffect(() => {
        dispatch({ type: PROGRAM_CREATE_RESET })

        if(successCreate) {

            // console.log(createdProgram);
            const redirect = `/program/${createdProgram.id}/edit`
            history(redirect)

        } else {
            dispatch(listPrograms(userId))
        }

    }, [dispatch, userInfo, successCreate, createProgram])

    // ** FUNCTIONS *8
    const createProgramHandler = (programs) => {
        dispatch(createProgram())
    }

    return (
        <div className="add-screen-container">
                <Header/>

                <h1>Add Screen</h1>

                {/* Create loader and error message */}
                {loadingCreate && <Loader />}
                {errorCreate && <ErrorMessage variant='danger>'>{errorCreate}</ErrorMessage>}

                <div className="btn-add-screen">
                    <button onClick={createProgramHandler}>
                        + Create Program
                    </button>

                    
                    <button>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={'/add-routine'}>Add Routine</Link>
                    </button>
                </div>

        </div>
    )
}

export default AddScreen