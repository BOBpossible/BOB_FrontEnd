import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginOption from '../screens/LoginOption';
import CustomerLogin from '../screens/customer/CustomerLogin';
import OwnerLogin from '../screens/owner/OwnerLogin';
import {MainNavigator} from './MainNavigator';
import {RegisterNavigator} from './RegisterNavigatior';
const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginOption"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="LoginOption" component={LoginOption} />
      <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
      <Stack.Screen name="OwnerLogin" component={OwnerLogin} />
      <Stack.Screen name="RegisterNavigator" component={RegisterNavigator} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};
