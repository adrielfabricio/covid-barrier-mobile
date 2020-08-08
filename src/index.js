import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Session from './routes/SessionStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar hidden={true} />
        <Session />
      </PersistGate>
    </Provider>
  );
};

export default App;
