import { combineReducers } from 'redux';

import { programListReducer } from './reducers/programReducer'

const rootReducer = combineReducers({

    programList: programListReducer,

})

export default rootReducer