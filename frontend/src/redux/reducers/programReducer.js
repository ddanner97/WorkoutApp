import { 
    PROGRAM_LIST_REQUEST, 
    PROGRAM_LIST_SUCCESS, 
    PROGRAM_LIST_FAIL,

    PROGRAM_DELETE_REQUEST,
    PROGRAM_DELETE_SUCCESS,
    PROGRAM_DELETE_FAIL,

    PROGRAM_CREATE_REQUEST,
    PROGRAM_CREATE_SUCCESS,
    PROGRAM_CREATE_FAIL,
    PROGRAM_CREATE_RESET,         
    
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

export const programDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PROGRAM_DELETE_REQUEST:
            return { loading: true }

        case PROGRAM_DELETE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        
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