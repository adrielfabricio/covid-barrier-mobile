import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Profile from '../views/Profile';
import Vehicle from '../views/Vehicle';
import Users from '../views/Users';
import Barrier from '../views/Barrier';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import getRolePermission from '../services/getRolePermission';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = useSelector((state) => state.user.auth.token);
  const dispatch = useDispatch();

  function addRolePermission(rolePermission) {
    dispatch({ type: 'ADD_ROLE_PERMISSION', rolePermission });
  }

  useEffect(() => {
    let mounted = true;
    const isAuthenticated = async () => {
      try {
        if (mounted) {
          let rolePermission = await getRolePermission();
          let checkIsAdmin = rolePermission.data.user.roles.find(
            (val) => val === 'admin_city',
          );
          if (checkIsAdmin) setIsAdmin(true);
          else setIsAdmin(false);

          addRolePermission(rolePermission.data.user);
        }
      } catch (error) {}
    };
    if (token) {
      isAuthenticated();
    }
    return () => (mounted = false);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Veículo':
              iconName = focused ? 'ios-car-sport' : 'ios-car-sport-outline';
              break;
            case 'Usuários':
              iconName = focused ? 'ios-people' : 'ios-people-outline';
              break;
            case 'Barreira':
              iconName = focused ? 'ios-shield' : 'ios-shield-outline';
              break;
            default:
              iconName = focused ? 'ios-person' : 'ios-person-outline';
              break;
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#ed1b23ff',
        inactiveTintColor: '#ed1b2366',
      }}>
      <Tab.Screen name="Veículo" component={Vehicle} />
      {isAdmin ? (
        <>
          <Tab.Screen name="Usuários" component={Users} />
          <Tab.Screen name="Barreira" component={Barrier} />
        </>
      ) : null}
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}
