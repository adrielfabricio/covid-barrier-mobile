import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../views/Profile';
import UpdateProfile from '../views/UpdateProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
