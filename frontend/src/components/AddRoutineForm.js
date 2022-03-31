import React, { useState, useEffect } from 'react'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

//Import Components
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import ExerciseParam from '../components/ExerciseParam'
import AddRoutineForm from '../components/AddRoutineForm';

function AddRoutineScreen() {
    const state = {...store.getState()}

    //VARIABLES All useState()
    //Using state to keep track of what the selected program option is
    const [program, setProgram] = useState("")
    const [routineName, setRoutineName] = useState("")

    // State variables for Exercise form
    const [exercise, setExercise] = useState("")
    const [weight, setWeight] = useState("")
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")

    // Array of programs {value -> id} {text -> name}
    let programOptions = useSelector(state => state.programList.programs)
    programOptions.unshift('New Program')
    console.log(programOptions)
    
    // FUNCTIONS
    // Submit Handler to save exercises
    const addExercise = (e) => {
        e.preventDefault()
        console.log()
    }

    return (
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
    
            <button type="submit">Add Exercise</button>
        </form>
    )
}

export default AddRoutineForm