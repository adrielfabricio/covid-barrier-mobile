import * as React from 'react';

import Profile from '../views/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Produtos':
              iconName = 'ios-home';
              break;
            default:
              iconName = 'ios-person';
              break;
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'pink',
        inactiveTintColor: 'red',
      }}>
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Vehicle" component={Vehicle} /> */}
      {/* <Tab.Screen name="Users" component={Users} /> */}
      {/* <Tab.Screen name="Barrier" component={Barrier} /> */}
    </Tab.Navigator>
  );
}
