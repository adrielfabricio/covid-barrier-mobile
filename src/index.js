import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Session from './routes/SessionStack';
import { Provider } from 'react-redux';

import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <Session />
    </Provider>
  );
};

export default App;
