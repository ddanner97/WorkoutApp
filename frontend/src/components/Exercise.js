import React, { useEffect } from 'react'
import { useParams } from 'react-router'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listExerciseParams } from '../redux/actions/programActions'
import { deleteExercise } from '../redux/actions/programActions'

// Components import

function Exercise({ exercise, exercise_params}) {
    const dispatch = useDispatch()

    const deleteHandler = (exercise_id) => {

        if (window.confirm(`Are you sure you want to delete this program? Program ${exercise_id}`)) {
            // delete program
            dispatch(deleteExercise(exercise_id))
            
        }
    }

    return (
        <div style={{ textDecoration: 'none' }}>
            <div>
                <h3>{exercise.name} </h3>
                <h4>{exercise.weight} lbs</h4>
                <h4>{exercise.sets} sets</h4>
                <h4>{exercise.reps} reps</h4>
                
                <button onClick={() => deleteHandler(exercise.id)}>
                    <i className="fas fa-trash"></i>
                </button>
                {/* {exercise_params ? (
                    exercise_params.data.map(parameter => (
                        <>
                            <h4 key={1}>{parameter.sets} sets</h4>
                            <h4 key={2}>{parameter.reps} reps</h4>
                            <h4 key={3}>{parameter.weight} lbs</h4>
                        </>
                    ))
                ) : (
                    <div></div>
                )} */}
            </div>
        </div>
    )
}

export default Exercise
