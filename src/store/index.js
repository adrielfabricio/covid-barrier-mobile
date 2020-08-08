// Config do redux
import { applyMiddleware, createStore } from 'redux';

// Logger para o redux
import { createLogger } from 'redux-logger';

// Config para persistencia de dados com o redux
import { persistStore } from 'redux-persist';

import reducer from './reducer';
// Array que conterá todos os middlewares
const middlewares = [];

// Cria middleware para o saga

// Logger para redux
const logger = createLogger({});

middlewares.push(logger);

// Criar o store com os reducers
const store = createStore(reducer, applyMiddleware(...middlewares));

// Criar o persistor com a store
const persistor = persistStore(store);

export { store, persistor };
