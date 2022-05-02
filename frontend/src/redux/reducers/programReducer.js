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
    PROGRAM_CREATE_RESET, 
    
    PROGRAM_UPDATE_REQUEST,
    PROGRAM_UPDATE_SUCCESS,
    PROGRAM_UPDATE_FAIL,
    PROGRAM_UPDATE_RESET,
    
    // ROUTINES
    PROGRAM_ROUTINES_REQUEST,
    PROGRAM_ROUTINES_SUCCESS,
    PROGRAM_ROUTINES_FAIL,

    ROUTINE_CREATE_SUCCESS,
    ROUTINE_CREATE_FAIL,
    ROUTINE_CREATE_REQUEST,
    ROUTINE_CREATE_RESET,

    // EXERCISES
    ROUTINE_EXERCISES_SUCCESS,
    ROUTINE_EXERCISES_FAIL,
    ROUTINE_EXERCISES_REQUEST,

    EXERCISE_CREATE_SUCCESS,
    EXERCISE_CREATE_FAIL,
    EXERCISE_CREATE_REQUEST,
    EXERCISE_CREATE_RESET,

    // EXERCISE ROUTINES
    EXERCISE_ROUTINE_CREATE_SUCCESS,
    EXERCISE_ROUTINE_CREATE_FAIL,
    EXERCISE_ROUTINE_CREATE_REQUEST,
    EXERCISE_ROUTINE_CREATE_RESET,

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
export const programListReducer = (state = { programs: []}, action) => {
    switch(action.type){
        case PROGRAM_LIST_REQUEST:
            return { loading: true, programs: [] }

        case PROGRAM_LIST_SUCCESS:
            return { loading: false, programs: action.payload }
        
        case PROGRAM_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const programDetailsReducer = (state = { program: []}, action) => {
    switch(action.type){
        case PROGRAM_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PROGRAM_DETAILS_SUCCESS:
            return { loading: false, program: action.payload }
        
        case PROGRAM_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const programDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PROGRAM_DELETE_REQUEST:
            return { loading: true }

        case PROGRAM_DELETE_SUCCESS:
            return { loading: false, success: true,}
        
        case PROGRAM_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const programCreateReducer = (state = {}, action) => {
    switch(action.type){
        case PROGRAM_CREATE_REQUEST:
            return { loading: true }

        case PROGRAM_CREATE_SUCCESS:
            return { loading: false, success: true, program: action.payload }
        
        case PROGRAM_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PROGRAM_CREATE_RESET:
            return { }

        default:
            return state
    }
}

export const programUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case PROGRAM_UPDATE_REQUEST:
            return { loading: true }

        case PROGRAM_UPDATE_SUCCESS:
            return { loading: false, success: true, program: action.payload }
        
        case PROGRAM_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PROGRAM_UPDATE_RESET:
            return { program: {} }

        default:
            return state
    }
}

// ROUTINES
export const programRoutinesReducer = (state = { routines: [] }, action) => {
    switch(action.type){
        case PROGRAM_ROUTINES_REQUEST:
            return { loading: true, routines: [] }

        case PROGRAM_ROUTINES_SUCCESS:
            return { loading: false, routines: action.payload }
        
        case PROGRAM_ROUTINES_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const routineCreateReducer = (state = {}, action) => {
    switch(action.type){
        case ROUTINE_CREATE_REQUEST:
            return { loading: true }

        case ROUTINE_CREATE_SUCCESS:
            return { loading: false, success: true, routine: action.payload }
        
        case ROUTINE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case ROUTINE_CREATE_RESET:
            return { }

        default:
            return state
    }
}

// EXERCISES
export const routineExerciseReducer = (state = { exercises: [] }, action) => {
    switch(action.type){
        case ROUTINE_EXERCISES_REQUEST:
            return { loading: true, exercises: [] }

        case ROUTINE_EXERCISES_SUCCESS:
            return { loading: false, exercises: action.payload }
        
        case ROUTINE_EXERCISES_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const exerciseCreateReducer = (state = {}, action) => {
    switch(action.type){
        case EXERCISE_CREATE_REQUEST:
            return { loading: true }

        case EXERCISE_CREATE_SUCCESS:
            return { loading: false, success: true, exercise: action.payload }
        
        case EXERCISE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_CREATE_RESET:
            return { }

        default:
            return state
    }
}

// EXERCISE ROUTINES
export const exerciseRoutineCreateReducer = (state = {}, action) => {
    switch(action.type){
        case EXERCISE_ROUTINE_CREATE_REQUEST:
            return { loading: true }

        case EXERCISE_ROUTINE_CREATE_SUCCESS:
            return { loading: false, success: true, exerciseRoutine: action.payload }
        
        case EXERCISE_ROUTINE_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_ROUTINE_CREATE_RESET:
            return { }

        default:
            return state
    }
}

// PARAMETERS
export const exerciseParamReducer = (state = { parameters: [] }, action) => {
    switch(action.type){
        case EXERCISE_PARAM_REQUEST:
            return { loading: true, parameters: [] }

        case EXERCISE_PARAM_SUCCESS:
            return { loading: false, parameters: action.payload }
        
        case EXERCISE_PARAM_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const parameterCreateReducer = (state = {}, action) => {
    switch(action.type){
        case EXERCISE_PARAM_CREATE_REQUEST:
            return { loading: true }

        case EXERCISE_PARAM_CREATE_SUCCESS:
            return { loading: false, success: true, parameters: action.payload }
        
        case EXERCISE_PARAM_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case EXERCISE_PARAM_CREATE_RESET:
            return { }

        default:
            return state
    }
}