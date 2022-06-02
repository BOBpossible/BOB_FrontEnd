import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import {MainNavigator} from './MainNavigator';
import {RegisterNavigator} from './RegisterNavigatior';
const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterNavigator" component={RegisterNavigator} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};
