import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Vehicle from '../views/Vehicle';
import VehicleHistoric from '../views/VehicleHistoric';

const Stack = createStackNavigator();

const VehicleStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Vehicle" component={Vehicle} />
      <Stack.Screen name="VehicleHistoric" component={VehicleHistoric} />
    </Stack.Navigator>
  );
};

export default VehicleStack;
