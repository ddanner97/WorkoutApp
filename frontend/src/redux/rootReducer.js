import { combineReducers } from 'redux';

import { 
    programListReducer, 
    programDetailsReducer,
    programDeleteReducer,
    programCreateReducer,
    programUpdateReducer,
    programRoutinesReducer, 
    routineExerciseReducer, 
    exerciseParamReducer, 
} from './reducers/programReducer'

import { 
    userLoginReducer, 
    userRegisterReducer
} from './reducers/userReducers';

const rootReducer = combineReducers({

    // Program Reducers
    programList: programListReducer,
    programDetails: programDetailsReducer,
    programDelete: programDeleteReducer,
    programCreate: programCreateReducer,
    programUpdate: programUpdateReducer,
    programRoutines: programRoutinesReducer,
    routineExercises: routineExerciseReducer,
    exerciseParameters: exerciseParamReducer,

    // User Reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

export default rootReducer