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