import React, { useState, useEffect } from 'react'
import { nanoid } from "nanoid";

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

//Import Components
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import ExerciseParam from '../components/ExerciseParam'
import axios from 'axios';

function AddRoutineScreen() {
    const state = {...store.getState()}

    //VARIABLES All useState()
    //Using state to keep track of what the selected program option is
    const [program, setProgram] = useState("")
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
    
    // FUNCTIONS
    // Submit handler to save workout
    const saveWorkout = async (e) => {
        e.preventDefault()

        const userInfo = state.userLogin.userInfo

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // await axios.post(
        //     `/api/programs/create-program/${newProgram}/`,
        //     newProgram,
        //     config
        // )

        console.log(program, newProgram, routineName, exerciseList, userInfo.token)
        
    }

    // Submit Handler to save exercises [uses setExerciseList hook to update list of exercises]
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

    //Old Program and New program components
    // function OldProgram() {
    //     return (
    //         <label>Select Program
    //             <select onChange={(e) => setProgram(e.target.value)} id="selectProgram">
    //                 <option value="Select a Program">Choose a Program</option>
    //                 {/* Map through each of the programs in our programOptions array 
    //                 and return an option element with the appropriate attribute */}
    //                 {programOptions.map((program) => <option key={program.name} value={program.id}>{program.name}</option>)}
    //             </select>
    //         </label>
    //     )
    // }

    // function NewProgram() {
    //     return (
    //         <label>Program Name
    //             <input
    //                 type="text"
    //                 placeholder="Enter New Program"
    //                 value={newProgram}
    //                 onChange={(e) => setNewProgram(e.target.value)}
    //             />
    //         </label> 
    //     )
    // }

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

                    <label>Program Name
                        <input
                            type="text"
                            placeholder="Enter New Program"
                            value={newProgram}
                            onChange={(e) => setNewProgram(e.target.value)}
                        />
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