import { combineReducers } from 'redux';
import catalog from './catalog';

const rootReducer = combineReducers({
  catalogState: catalog
});

export default rootReducer;
