import { combineReducers } from 'redux';

import { groupReducer } from './groupRecuder';
import { roomReducer } from './roomReducer';
import { usersReducer } from './usersReducer';


export const rootReducer = combineReducers({
  roomReducer,
  usersReducer,
  groupReducer,
});