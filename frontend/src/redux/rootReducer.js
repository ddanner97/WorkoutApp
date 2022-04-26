import { combineReducers } from 'redux';

import { 
    programListReducer, 
    programDetailsReducer,
    programDeleteReducer,
    programCreateReducer,
    programUpdateReducer,

    programRoutinesReducer, 
    routineCreateReducer,

    routineExerciseReducer, 
    exerciseCreateReducer,

    exerciseParamReducer,
    exerciseRoutineCreateReducer, 
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

    // Routine Reducers
    programRoutines: programRoutinesReducer,
    routineCreate: routineCreateReducer,

    // Exercise Reducers
    routineExercises: routineExerciseReducer,
    exerciseCreate: exerciseCreateReducer,

    // Exercise Routines
    exerciseRoutineCreate: exerciseRoutineCreateReducer,

    // Param Reducers
    exerciseParameters: exerciseParamReducer,

    // User Reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

export default rootReducer