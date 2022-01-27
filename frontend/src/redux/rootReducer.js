import { combineReducers } from 'redux';

import { programListReducer, programRoutinesReducer } from './reducers/programReducer'
import { userLoginReducer } from './reducers/userReducers';

const rootReducer = combineReducers({

    programList: programListReducer,
    programRoutines: programRoutinesReducer,
    userLogin: userLoginReducer,

})

export default rootReducer