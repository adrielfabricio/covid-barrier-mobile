import { combineReducers } from 'redux';
// Para armazenamento dos dados no celular

import user from './user';

const allReducer = combineReducers({
  user,
});

export default allReducer;
