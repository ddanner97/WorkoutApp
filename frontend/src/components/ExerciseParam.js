import React from 'react'
import { Link } from 'react-router-dom'
import '../static/styles/components/ExerciseParam/exerciseParam.css'

function ExerciseParam(props) {
    return (
        <li className="exerciseAddParam-container" style={{listStyle: 'none'}}>
             <h4>{props.exerciseName}</h4>

            {/* container for parameters - reps, weight, sets, exercise - */}
            <div className="parameter-list-container">
                <div className="parameter-container">
                    {props.weight} lbs
                </div>
                <div className="parameter-container">
                    {props.sets} sets
                </div>
                <div className="parameter-container">
                    {props.reps} reps
                </div>
            </div>

            {/* Edit and delete buttons */}
            <div className="param-btn-group">
                <button type="button" className="btn">
                    Edit <span className="visually-hidden" style={{visibility: 'hidden'}}>{props.exerciseName}</span>
                </button>
                <button 
                    type="button" 
                    className="btn btn__danger"
                    onClick={() => props.deleteExercise(props.id)}
                >
                    Delete <span className="visually-hidden" style={{visibility: 'hidden'}}>{props.exerciseName}</span>
                </button>
            </div>
        </li>
    )
}

export default ExerciseParam