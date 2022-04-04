import { combineReducers } from 'redux';

import { programListReducer, programRoutinesReducer, routineExerciseReducer, exerciseParamReducer } from './reducers/programReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const rootReducer = combineReducers({

    programList: programListReducer,
    programRoutines: programRoutinesReducer,
    routineExercises: routineExerciseReducer,
    exerciseParameters: exerciseParamReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

export default rootReducer