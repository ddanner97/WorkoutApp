import React, { useEffect } from 'react'
import { useParams } from 'react-router'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { listRoutineExercises } from '../redux/actions/programActions'
import { listExerciseParams } from '../redux/actions/programActions'

//Import Components
import SearchBar from '../components/SearchBar'
import Exercise from '../components/Exercise'
import Header from '../components/Header'
import store from '../redux/store'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import StopWatch from '../components/StopWatch'

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

    // List of Exercises -> use spread operator to unpack elements from routineExercises
    const routineExercises = useSelector(state => state.routineExercises)
    const { error, loading, exercises } = routineExercises

    // ** ACTIONS **
    // Get exercises action
    useEffect(() => {

        dispatch(listRoutineExercises(program_id, routine_id))

    }, [dispatch])

    // Get Program Name for display *Has to be a better way to do this such as passing in prop*
    let routineName = ''

    for (let i = 0; i < state.programRoutines.routines.length; i++){

        if (id == state.programRoutines.routines[i].id) {
            routineName = state.programRoutines.routines[i].name
        }
    }

    return (
        <div className="screen-container">
            <Header/>

            <h1>{routineName}</h1>

            <StopWatch/>
         
            {/* Ternary operator: If loading == True render loading, If error == render error, else render page */}
            { loading ? <Loader/> 
                : error ? <ErrorMessage>{error}</ErrorMessage>
                    :
                    <div className="card-container">

                        {exercises ? (
                                exercises.data?.map((exercise, index) => (
                                    // Render Routines
                                    <Exercise key={exercise.id} exercise_params={exercises.exerciseParams[index]} exercise={exercise}/>
                                ))
                            ) : (
                                exercises.map((exercise) => (
                                    // Render Routines
                                    <h3>{exercise.name}</h3>
                                ))
                        )}
                    </div>

            }
        </div>
    )
}

export default RoutineScreen
