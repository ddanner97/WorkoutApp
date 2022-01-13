import { 
    PROGRAM_LIST_REQUEST, 
    PROGRAM_LIST_SUCCESS, 
    PROGRAM_LIST_FAIL 
} from '../constants/programConstants';

export const programListReducer = (state = { programs: [] }, action) => {
    switch(action.type){
        case PROGRAM_LIST_REQUEST:
            return { loading: true, program: [] }

        case PROGRAM_LIST_SUCCESS:
            return { loading: false, program: action.payload }
        
        case PROGRAM_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}