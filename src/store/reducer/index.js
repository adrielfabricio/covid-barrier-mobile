import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// Para armazenamento dos dados no celular
import AsyncStorage from '@react-native-community/async-storage';

import user from './user';
// Cria uma config com chave para a persistencia de dados
const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  timeout: null,
};

const allReducer = combineReducers({
  user: persistReducer(userPersistConfig, user),
});

export default allReducer;
