import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listRoutineExercises } from '../redux/actions/programActions'

//Import Components
import SearchBar from '../components/SearchBar'
import Exercise from '../components/Exercise'
import Header from '../components/Header';
import store from '../redux/store'

function RoutineScreen() {
    // Get routine id which was passed in through program screen components
    const { id } = useParams()
    const routine_id = id

    //Extract program id from routine
    const state = {...store.getState()}
    let program_id
    // -- set routines, which we will loop through to find program id
    const routines = state.programRoutines.routines
    // -- loop through routines, find match for routine_id, then set program_id to that program
    for (let i in routines) {
        if (i.id == routine_id){
            program_id = i.program
        }
    }


    const dispatch = useDispatch()

    // use spread operator to unpack elements from routineExercises
    const routineExercises = useSelector(state => state.routineExercises)
    const { error, loading, exercises } = routineExercises

    useEffect(() => {

        dispatch(listRoutineExercises(program_id, routine_id))

    }, [dispatch])

    return (
        <div className="screen-container">
            <Header/>

            <SearchBar/>

            <div className="card-container">
                {exercises.map((exercise) => (
                    // Render Routines
                    <Exercise key={exercise.id} exercise={exercise}/>
                ))}
            </div>
        </div>
    )
}

export default RoutineScreen
