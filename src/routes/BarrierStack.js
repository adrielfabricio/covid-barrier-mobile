import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Barrier from '../views/Barrier';
import BarrierAdd from '../views/BarrierAdd';
import BarrierUpdate from '../views/BarrierUpdate';

const Stack = createStackNavigator();

const BarrierStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Barrier" component={Barrier} />
      <Stack.Screen name="BarrierAdd" component={BarrierAdd} />
      <Stack.Screen name="BarrierUpdate" component={BarrierUpdate} />
    </Stack.Navigator>
  );
};

export default BarrierStack;
