import { combineReducers } from 'redux';

import { 
    programListReducer, 
    programDeleteReducer,
    programCreateReducer,
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
    programDelete: programDeleteReducer,
    programCreate: programCreateReducer,
    programRoutines: programRoutinesReducer,
    routineExercises: routineExerciseReducer,
    exerciseParameters: exerciseParamReducer,

    // User Reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

export default rootReducer