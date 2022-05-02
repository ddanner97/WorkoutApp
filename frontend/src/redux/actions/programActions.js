import axios from 'axios'
import { 
    // PROGRAMS
    PROGRAM_LIST_REQUEST, 
    PROGRAM_LIST_SUCCESS, 
    PROGRAM_LIST_FAIL,

    PROGRAM_DETAILS_REQUEST,
    PROGRAM_DETAILS_SUCCESS,
    PROGRAM_DETAILS_FAIL,

    PROGRAM_DELETE_REQUEST,
    PROGRAM_DELETE_SUCCESS,
    PROGRAM_DELETE_FAIL,

    PROGRAM_CREATE_REQUEST,
    PROGRAM_CREATE_SUCCESS,
    PROGRAM_CREATE_FAIL,
    
    PROGRAM_UPDATE_REQUEST,
    PROGRAM_UPDATE_SUCCESS,
    PROGRAM_UPDATE_FAIL,
    
    // ROUTINES
    PROGRAM_ROUTINES_REQUEST,
    PROGRAM_ROUTINES_SUCCESS,
    PROGRAM_ROUTINES_FAIL,

    ROUTINE_CREATE_SUCCESS,
    ROUTINE_CREATE_FAIL,
    ROUTINE_CREATE_REQUEST,

    // EXERCISES
    ROUTINE_EXERCISES_SUCCESS,
    ROUTINE_EXERCISES_FAIL,
    ROUTINE_EXERCISES_REQUEST,

    EXERCISE_CREATE_SUCCESS,
    EXERCISE_CREATE_FAIL,
    EXERCISE_CREATE_REQUEST,

    // EXERCISE ROUTINE BRIDGE
    EXERCISE_ROUTINE_CREATE_SUCCESS,
    EXERCISE_ROUTINE_CREATE_FAIL,
    EXERCISE_ROUTINE_CREATE_REQUEST,

    // PARAMETERS
    EXERCISE_PARAM_CREATE_SUCCESS,
    EXERCISE_PARAM_CREATE_FAIL,
    EXERCISE_PARAM_CREATE_REQUEST,
    EXERCISE_PARAM_CREATE_RESET,

    EXERCISE_PARAM_SUCCESS,
    EXERCISE_PARAM_FAIL,
    EXERCISE_PARAM_REQUEST,
} from '../constants/programConstants';

// PROGRAMS
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

export const listProgramDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: PROGRAM_DETAILS_REQUEST})

        const { data } =  await axios.get(`/api/programs/program/${id}`)

        dispatch({
            type: PROGRAM_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROGRAM_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

export const deleteProgram = (program_id) => async (dispatch, getState) => {
    try{
        dispatch({ type: PROGRAM_DELETE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } =  await axios.delete(
            `/api/programs/program-delete/${program_id}`,
            config
        )

        dispatch({
            type: PROGRAM_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PROGRAM_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

export const createProgram = () => async (dispatch, getState) => {
    try{
        dispatch({ type: PROGRAM_CREATE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        // Pulling out the current user we are logged in as 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to create product
        const { data } =  await axios.post(
            `/api/programs/program-create/`,
            {},
            config
        )

        dispatch({
            type: PROGRAM_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PROGRAM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

export const updateProgram = (program) => async (dispatch, getState) => {
    try{
        dispatch({ type: PROGRAM_UPDATE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        // Pulling out the current user we are logged in as 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to create product
        const { data } =  await axios.put(
            `/api/programs/program-update/${program.id}/`,
            program,
            config
        )

        dispatch({
            type: PROGRAM_UPDATE_SUCCESS,
            payload: data,
        })

        //Load in updated product into details 
        dispatch({
            type: PROGRAM_DETAILS_SUCCESS, 
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROGRAM_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

// ROUTINES
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

export const createRoutine = (routine) => async (dispatch, getState) => {
    try{
        dispatch({ type: ROUTINE_CREATE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        // Pulling out the current user we are logged in as 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to create product
        const { data } =  await axios.post(
            `api/programs/routine-create/${routine.program_id}/`,
            routine,
            config
        )

        dispatch({
            type: ROUTINE_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ROUTINE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

// EXERCISES
export const listRoutineExercises = (program_id, routine_id) => async (dispatch) => {
    try{
        dispatch({ type: ROUTINE_EXERCISES_REQUEST})

        //Array to hold exercise object: Exercise + Parameters
        const exerciseParams = []
        const promises = []
        const exercises = []

        const { data } =  await axios.get(`/api/programs/${program_id}/routine/${routine_id}`)

        for (let i = 0; i < data.length; i++){
            promises.push(
                axios.get(`/api/programs/routine/${routine_id}/exercise/${data[i].id}/`).then(response => {
                    //Do something with response
                    exerciseParams.push(response)
                })
            )
        }

        Promise.all(promises).then(() => {})

        dispatch({
            type: ROUTINE_EXERCISES_SUCCESS,
            payload: {data, exerciseParams},
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

export const createExercise = (exercise) => async (dispatch, getState) => {
    try{
        dispatch({ type: EXERCISE_CREATE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        // Pulling out the current user we are logged in as 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to create product
        const { data } =  await axios.post(
            `/api/programs/exercise-create/`,
            exercise,
            config
        )

        dispatch({
            type: EXERCISE_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

// EXERCISE ROUTINE BRIDGE
export const createExerciseRoutine = (exerciseRoutine) => async (dispatch, getState) => {
    try{
        dispatch({ type: EXERCISE_ROUTINE_CREATE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        // Pulling out the current user we are logged in as 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to create product
        const { data } =  await axios.post(
            `/api/programs/exercise-routine-create/routine/${exerciseRoutine.routine_pk}/exercise/${exerciseRoutine.exercise_pk}/`,
            exerciseRoutine,
            config
        )

        dispatch({
            type: EXERCISE_ROUTINE_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_ROUTINE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}

// PARAMETERS
export const listExerciseParams = (routine_id, exerciseIdList) => async (dispatch) => {
    try{
        dispatch({ type: EXERCISE_PARAM_REQUEST})

        const exerciseParams = []
        const exerciseParams2 = []

        for (let i = 0; i < exerciseIdList.length; i++){
            exerciseParams.push(await axios.get(`/api/programs/routine/${routine_id}/exercise/${exerciseIdList[i]}/`))
            const { data } = exerciseParams[i]
            exerciseParams2.push(data)
        }

        console.log(exerciseParams2)

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

export const createParam = (parameters) => async (dispatch, getState) => {
    try{
        dispatch({ type: EXERCISE_PARAM_CREATE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        // Pulling out the current user we are logged in as 
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to create product
        const { data } =  await axios.post(
            `/api/programs/workout-params-create/${parameters.bridge_id}/`,
            parameters,
            config
        )

        dispatch({
            type: EXERCISE_PARAM_CREATE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: EXERCISE_PARAM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message
        })
    }
}