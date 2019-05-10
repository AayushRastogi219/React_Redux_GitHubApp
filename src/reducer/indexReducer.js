import {combineReducers} from 'redux';
import formReducer from './formReducer';
import accountReducer from './accountReducer';

const combReducer = combineReducers({formReducer, accountReducer});

export default combReducer;
