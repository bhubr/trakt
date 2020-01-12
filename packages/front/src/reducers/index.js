import { combineReducers } from 'redux';
import auth from './auth';
import filters from './filters';
import tasks from './tasks';
import workspaces from './workspaces';
import timer from './timer';

const rootReducer = combineReducers({
  auth,
  filters,
  tasks,
  workspaces,
  timer,
});

export default rootReducer;
