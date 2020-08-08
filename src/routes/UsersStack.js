import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Users from '../views/Users';
import UpdateUser from '../views/UpdateUser';

const Stack = createStackNavigator();

const UsersStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
    </Stack.Navigator>
  );
};

export default UsersStack;
