import { combineReducers } from 'redux';

import { programListReducer, programRoutinesReducer } from './reducers/programReducer'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const rootReducer = combineReducers({

    programList: programListReducer,
    programRoutines: programRoutinesReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

export default rootReducer