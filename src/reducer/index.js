// import { combineReducers } from "redux";
import {combineReducers} from 'redux-loop';
import showTacosReducer from './ShowTacosReducer';

const rootReducer = combineReducers({
  showTacosReducer: showTacosReducer,
});

export default rootReducer;
