import { combineReducers } from 'redux';

import { programListReducer, programRoutinesReducer } from './reducers/programReducer'

const rootReducer = combineReducers({

    programList: programListReducer,
    programRoutines: programRoutinesReducer,

})

export default rootReducer