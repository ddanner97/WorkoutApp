import React, { useState, useEffect } from 'react'
import { nanoid } from "nanoid";

/* REACT ROUTER */
import { Link, useParams, useNavigate, } from 'react-router-dom';

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

/* ACTION CREATORS */
import { createRoutine, createExercise, createExerciseRoutine } from "../redux/actions/programActions";

/* ACTION TYPES */
import { ROUTINE_CREATE_RESET, EXERCISE_CREATE_RESET, EXERCISE_ROUTINE_CREATE_RESET } from '../redux/constants/programConstants';

//Import Components
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
    const [exerciseList, setExerciseList] = useState([])
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

    useEffect(() => {

        if(successRoutineCreate) {
            for (let i = 0; i < exerciseList.length; i++){
                
                // dispatch create exercise using async function
                let exerciseName = exerciseList[i].exerciseName

                dispatch(createExercise({
                    exerciseName
                }))

            }

            const redirect = `/`
            history(redirect)
        }

        // if (successExerciseCreate) {
        //     let routine_pk = routineCreate.routine
        //     let exercise_pk = exerciseCreate.exercise

        //     console.log(routine_pk)
        //     console.log(exercise_pk)
        //     // dispatch create exercise routine bridge
        //     // dispatch(createExerciseRoutine({
        //     //    routine_pk,
        //     //    exercise_pk,
        //     // }))
        // } 

        // Reset 
        // dispatch({ type: ROUTINE_CREATE_RESET })

    }, [dispatch, successRoutineCreate, createRoutine, successExerciseCreate, createExercise])
    
    // FUNCTIONS
    // Submit handler to SAVE WORKOUT
    const saveWorkout = async (e) => {
        e.preventDefault()

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

        // Create object
        const newExercise = {
            exerciseName: exercise, 
            weight: weight, 
            sets: sets, 
            reps: reps, 
            id: "exercise-" + nanoid()}

        // Clear input fields after submitting
        setExercise("")
        setWeight("")
        setSets("")
        setReps("")

        // Use spread operator to copy existing array, and we add our object newExercise 
        // PAssing both into setExerciseList() to update the state
        setExerciseList([...exerciseList, newExercise])
    }

    // Delete 
    function deleteExercise(id) {
        //Filter out object with matching id and create new array without object
        const remainingExercises = exerciseList.filter(exercise => id !== exercise.id )
        //Call setExerciseList to set list to new array, thus deleting the object from array
        setExerciseList(remainingExercises)
    }

    //Render ExerciseParam components
    const exercise_list = exerciseList.map(exercise => (
        // Iterates through entire exercise array and return a ExerciseParam component back 
        // for each element in the array
        <ExerciseParam 
            id={exercise.id} 
            exerciseName={exercise.exerciseName} 
            weight={exercise.weight} 
            sets={exercise.sets} 
            reps={exercise.reps}
            key={exercise.id}
            deleteExercise={deleteExercise}
        />
    ))

    return (
        <div className="screen-container">
            <Header/>

            {/* Form for adding exercises */}
            <form className="add-exercise" onSubmit={addExercise}>
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
                </div>

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
                {exercise_list}
            </ul>
            
            {/* Button to save workout -> POST to database */}
            <button className='saveWorkout' onClick={saveWorkout}>Save Workout</button>
        </div>
    )
}

export default AddRoutineScreen