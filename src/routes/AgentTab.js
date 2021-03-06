import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProfileStack from './ProfileStack';
import UsersStack from './UsersStack';
import BarrierStack from './BarrierStack';
import VehicleStack from './VehicleStack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import getRolePermission from '../services/getRolePermission';

import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = useSelector((state) => state.user.auth.token);
  const dispatch = useDispatch();

  function addRolePermission(rolePermission) {
    dispatch({ type: 'ADD_ROLE_PERMISSION', rolePermission });
  }

  const setGeolocation = (latitude, longitude, radius = 10.0) => {
    dispatch({
      type: 'ADD_GEOLOCATION',
      geolocation: { latitude, longitude, radius },
    });
  };

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

  useEffect(() => {
    Geolocation.getCurrentPosition(
      function onSuccess(pos) {
        setGeolocation(pos.coords.latitude, pos.coords.longitude);
      },
      function onError(err) {
        console.log(err);
      },
    );
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
      <Tab.Screen name="Veículo" component={VehicleStack} />
      {isAdmin ? (
        <>
          <Tab.Screen name="Usuários" component={UsersStack} />
          <Tab.Screen name="Barreira" component={BarrierStack} />
        </>
      ) : null}
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}
