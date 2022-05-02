import React, { useState, useEffect } from 'react'
import { nanoid } from "nanoid";

/* REACT ROUTER */
import { Link, useParams, useNavigate, } from 'react-router-dom';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

/* ACTION CREATORS */
import { createRoutine, createExercise, createExerciseRoutine, createParam } from "../redux/actions/programActions";
import { listRoutineExercises } from '../redux/actions/programActions' //Listing actions

/* ACTION TYPES */
import { ROUTINE_CREATE_RESET, EXERCISE_CREATE_RESET, EXERCISE_ROUTINE_CREATE_RESET, EXERCISE_PARAM_CREATE_RESET } from '../redux/constants/programConstants';

//Import Components
import Exercise from '../components/Exercise'
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import ExerciseParam from '../components/ExerciseParam'

function AddRoutineScreen() {
    const history = useNavigate();

    const state = {...store.getState()}

    //VARIABLES All useState()
    //Using state to keep track of what the selected program option is
    const [program_id, setProgram] = useState("")
    const [newProgram, setNewProgram] = useState("")
    const [routineName, setRoutineName] = useState("")

    // State variables for Exercise form
    const [exercise, setExercise] = useState("")
    const [weight, setWeight] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")

    // Array of programs {value -> id} {text -> name}
    let programOptions = useSelector(state => state.programList.programs)

    // REDUX FUNCTIONS & VARIABLES
    const dispatch = useDispatch();

    // routine create
    const routineCreate = useSelector(state => state.routineCreate)
    const { error: errorRoutineCreate, loading: loadingRoutineCreate, success: successRoutineCreate } = routineCreate

    // exercise create
    const exerciseCreate = useSelector(state => state.exerciseCreate)
    const { error: errorExerciseCreate, loading: loadingExerciseCreate, success: successExerciseCreate } = exerciseCreate

    // exercise routine create
    const exerciseRoutineCreate = useSelector(state => state.exerciseRoutineCreate)
    const { error: errorExerciseRoutineCreate, loading: loadingExerciseRoutineCreate, success: successExerciseRoutineCreate } = exerciseRoutineCreate

    // Listing Exercises
    // List of Exercises -> use spread operator to unpack elements from routineExercises
    const routineExercises = useSelector(state => state.routineExercises)
    const { error, loading, exercises } = routineExercises

    // Getting Parameters
    const exerciseParameters = useSelector(state => state.exerciseParameters)
    const { paramError, paramLoading, parameters } = exerciseParameters

    useEffect(() => {

        if (successExerciseCreate) {
            let routine_pk = routineCreate.routine.id
            let exercise_pk = exerciseCreate.exercise.id

            // dispatch create exercise routine bridge
            dispatch(createExerciseRoutine({
               routine_pk,
               exercise_pk,
            }))

            dispatch({ type: EXERCISE_CREATE_RESET })            
        } 

        if (successExerciseRoutineCreate) {

            //dispatch create workout params
            dispatch(createParam({
                bridge_id: exerciseRoutineCreate.exerciseRoutine.id,
                sets,
                reps,
                weight,
            }))

            // Clear input fields after submitting
            setExercise("")
            setWeight("")
            setSets("")
            setReps("")


            dispatch(listRoutineExercises(program_id, routineCreate.routine.id))

            // reset
            dispatch({ type: EXERCISE_ROUTINE_CREATE_RESET })
        }

    }, [createExercise, successExerciseCreate, createExerciseRoutine, successExerciseRoutineCreate])
    
    // FUNCTIONS
    // Submit handler to SAVE WORKOUT
    const saveWorkout = async (e) => {
        e.preventDefault()

        // Reset all create state and send home
        dispatch({ type: ROUTINE_CREATE_RESET })

        const redirect = `/`
        history(redirect)
        
    }

    // submit handler to ADD ROUTINE 
    const addRoutine = (e) => {
        e.preventDefault()

        if (program_id == ""){
            alert("Must select a program")
            return false
        }

        if (routineName == ""){
            alert("Routine name must be filled out")
            return false
        }

        // Create Routine -> Send data to action
        dispatch(
            createRoutine({
              program_id,
              routineName,
            })
        );
    }

    // Submit Handler to SAVE EXERCISES [uses setExerciseList hook to update list of exercises]
    const addExercise = (e) => {
        e.preventDefault()

        if (Object.keys(routineCreate).length === 0){
            alert("Must add routine")
            return false
        }

        if (exercise == ""){
            alert("Must enter exercise name")
            return false
        }

        if (weight == ""){
            alert("Must enter weight")
            return false
        }

        if (sets == ""){
            alert("Must enter sets")
            return false
        }

        if (reps == ""){
            alert("Must enter reps")
            return false
        }

        dispatch(createExercise({
            exerciseName: exercise
        }))
    }

    return (
        <div className="screen-container">
            <Header/>

            {/* create selector that allows user to choose program */}
            <div className="program-selector">

                <label>Select Program
                    <select onChange={(e) => setProgram(e.target.value)} id="selectProgram">
                        <option value="Select a Program">Choose a Program</option>
                        {/* Map through each of the programs in our programOptions array 
                        and return an option element with the appropriate attribute */}
                        {programOptions.map((program) => <option key={program.name} value={program.id}>{program.name}</option>)}
                    </select>
                </label>

                <label>Routine Name
                    <input
                        type="text"
                        placeholder="Enter Routine Name"
                        value={routineName}
                        onChange={(e) => setRoutineName(e.target.value)}
                    />
                </label> 

                {/* Button to save routine */}
                <button className='addRoutine' onClick={addRoutine}>Add Routine</button>
            </div>

            {/* Form for adding exercises */}
            <form className="add-exercise" onSubmit={addExercise}>

                {/* input for exercise parameters */}
                <div className="input-exercise-params">
                    <div className="param-container">
                        <label>Exercise
                            <input
                                type="text"
                                placeholder="Enter Exercise"
                                value={exercise}
                                onChange={(e) => setExercise(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="param-container">
                        <label>Weight
                            <input
                                type="number"
                                placeholder="Enter Weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="param-container">
                        <label>Sets
                            <input
                                type="number"
                                placeholder="Enter Sets"
                                value={sets}
                                onChange={(e) => setSets(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="param-container">
                        <label>Reps
                            <input
                                type="number"
                                placeholder="Enter Reps"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
        
                {/* Button to submit exercise -> add to list -> runs addExercise */}
                <button type="submit">Add Exercise</button>
            </form>
            
            {/* Render ExerciseParam Components */}
            <ul className="routineParam-container">
                {/* {exercise_list} */}
            </ul>

            {/* Ternary operator: If loading == True render loading, If error == render error, else render page */}
            { paramLoading ? <Loader/> 
                : paramError ? <ErrorMessage>{error}</ErrorMessage>
                    :
                    <div className="card-container">
                        {/* render Program */}

                        {exercises && parameters ? (
                                exercises.map((exercise, index) => (
                                    // Render Routines
                                    <Exercise key={exercise.id} exercise_params={parameters[index]} exercise={exercise}/>
                                ))
                            ) : (
                                exercises.map((exercise) => (
                                    // Render Routines
                                    <h3>{exercise.name}</h3>
                                ))
                        )}
                    </div>

            }
            
            {/* Button to save workout -> POST to database */}
            <button className='saveWorkout' onClick={saveWorkout}>Save Workout</button>
        </div>
    )
}

export default AddRoutineScreen