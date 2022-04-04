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

    // Getting Exercises
    // use spread operator to unpack elements from routineExercises
    const routineExercises = useSelector(state => state.routineExercises)
    const { error, loading, exercises } = routineExercises

    useEffect(() => {

        dispatch(listRoutineExercises(program_id, routine_id))

    }, [dispatch])

    // Getting Parameters
    const exerciseParameters = useSelector(state => state.exerciseParameters)
    const { paramError, paramLoading, parameters } = exerciseParameters

    useEffect(() => {
        // Call Action once GET method for excercises is finished
        if(exercises) {
            // GET all exercise ids
            const exerciseIdList = [];
            
            for (let i = 0; i < exercises.length; i++){
                exerciseIdList.push(exercises[i].id)
            }

            dispatch(listExerciseParams(routine_id, exerciseIdList))  
        }

    }, [dispatch], )

    return (
        <div className="screen-container">
            <Header/>

            <SearchBar/>

         
            {/* Ternary operator: If loading == True render loading, If error == render error, else render page */}
            { paramLoading ? <Loader/> 
                : paramError ? <ErrorMessage>{error}</ErrorMessage>
                    :
                    <div className="card-container">
                        {/* render Program */}
                        {exercises.map((exercise, index) => (
                            // Render Routines
                            <Exercise key={exercise.id} exercise_params={parameters[index]} exercise={exercise}/>
                        ))}
                    </div>

            }
            {/* {exercises.map((exercise, index) => (
                // Render Routines
                <Exercise key={exercise.id} exercise_params={parameters[index]} exercise={exercise}/>
            ))} */}
          
        </div>
    )
}

export default RoutineScreen
