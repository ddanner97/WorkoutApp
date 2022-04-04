import axios from 'axios'
import { 
    PROGRAM_LIST_REQUEST, 
    PROGRAM_LIST_SUCCESS, 
    PROGRAM_LIST_FAIL,
    
    PROGRAM_ROUTINES_REQUEST, 
    PROGRAM_ROUTINES_SUCCESS, 
    PROGRAM_ROUTINES_FAIL,

    ROUTINE_EXERCISES_SUCCESS,
    ROUTINE_EXERCISES_FAIL,
    ROUTINE_EXERCISES_REQUEST,

    EXERCISE_PARAM_SUCCESS,
    EXERCISE_PARAM_FAIL,
    EXERCISE_PARAM_REQUEST,
} from '../constants/programConstants';

export const listPrograms = (userId) => async (dispatch) => {
    try{
        dispatch({ type: PROGRAM_LIST_REQUEST})

        const { data } =  await axios.get(`/api/programs/${userId}`)

        dispatch({
            type: PROGRAM_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROGRAM_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

export const listProgramRoutines = (userId, program_id) => async (dispatch) => {
    try{
        dispatch({ type: PROGRAM_ROUTINES_REQUEST})

        const { data } =  await axios.get(`/api/programs/${userId}/program_routines/${program_id}`)

        dispatch({
            type: PROGRAM_ROUTINES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROGRAM_ROUTINES_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}

export const listRoutineExercises = (program_id, routine_id) => async (dispatch) => {
    try{
        dispatch({ type: ROUTINE_EXERCISES_REQUEST})

        const { data } =  await axios.get(`/api/programs/${program_id}/routine/${routine_id}`)

        dispatch({
            type: ROUTINE_EXERCISES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ROUTINE_EXERCISES_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}

export const listExerciseParams = (routine_id, exerciseIdList) => async (dispatch) => {
    try{
        dispatch({ type: EXERCISE_PARAM_REQUEST})

        const exerciseParams = []
        const exerciseParams2 = []

        for (let i = 0; i < exerciseIdList.length; i++){
            console.log(exerciseIdList[i])
            exerciseParams.push(await axios.get(`/api/programs/routine/${routine_id}/exercise/${exerciseIdList[i]}`))
            const { data } = exerciseParams[i]
            exerciseParams2.push(data)
        }

        dispatch({
            type: EXERCISE_PARAM_SUCCESS,
            payload: exerciseParams2
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_PARAM_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message
        })
    }
}