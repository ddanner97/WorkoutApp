import React, { useState, useEffect } from 'react'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../redux/actions/programActions'

//Import Components
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import store from '../redux/store';
import Header from '../components/Header';


function AddRoutineScreen() {
    

    return (
        <div className="screen-container">
            <Header/>

            <form className=''>
                <button type="submit" className='saveWorkout'>Save Workout</button>


            </form>

            <button className='addExercise'>Add Exercise</button>

        </div>
    )
}

export default AddRoutineScreen