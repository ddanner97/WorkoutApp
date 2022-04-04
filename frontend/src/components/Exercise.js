import React, { useEffect } from 'react'
import { useParams } from 'react-router'

//Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { listExerciseParams } from '../redux/actions/programActions'

// Components import
import Parameters from './Parameters';

function Exercise({ exercise, exercise_params}) {

    return (
        <div style={{ textDecoration: 'none' }}>
            <div>
                <h3>{exercise.name} </h3>
                {exercise_params ? (
                    exercise_params.map(parameter => (
                        <>
                            <h4 key={1}>{parameter.sets} sets</h4>
                            <h4 key={2}>{parameter.reps} reps</h4>
                            <h4 key={3}>{parameter.weight} lbs</h4>
                        </>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default Exercise
