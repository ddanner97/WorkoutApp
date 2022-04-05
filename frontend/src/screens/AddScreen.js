import React, { useState, useEffect } from 'react'

// Import Components
import Header from '../components/Header';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listPrograms } from '../redux/actions/programActions'
import store from '../redux/store';

function AddScreen() {
    // Get userID
    const state = {...store.getState()}
    const userId = state.userLogin.userInfo.id

    const dispatch = useDispatch()

    // List of Programs
    const programList = useSelector(state => state.programList)
    const { error, loading, programs } = programList

    // Get program action
    useEffect(() => {

        dispatch(listPrograms(userId))

    }, [dispatch])

    // ** FUNCTIONS *8
    const createProgramHandler = (programs) => {
        //Create Program
    }

    return (
        <div className="screen-container">
                <Header/>

                <h1>Add Screen</h1>

                <button onclick={createProgramHandler}>
                    + Create Program
                </button>

        </div>
    )
}

export default AddScreen