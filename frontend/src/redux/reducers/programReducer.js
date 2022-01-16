import { 
    PROGRAM_LIST_REQUEST, 
    PROGRAM_LIST_SUCCESS, 
    PROGRAM_LIST_FAIL,
    
    PROGRAM_ROUTINES_REQUEST, 
    PROGRAM_ROUTINES_SUCCESS, 
    PROGRAM_ROUTINES_FAIL,
} from '../constants/programConstants';

export const programListReducer = (state = { programs: [] }, action) => {
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