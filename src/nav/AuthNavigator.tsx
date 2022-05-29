import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginOption from '../screens/LoginOption';
import CustomerLogin from '../screens/customer/CustomerLogin';
import OwnerLogin from '../screens/owner/OwnerLogin';
import CustomerRegister from '../screens/owner/OwnerRegister';
import OwnerRegister from '../screens/owner/OwnerRegister';
import MainNavigator from '../nav/MainNavigator';
const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginOption" screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginOption" component={LoginOption} />
      <Stack.Screen name="CustomerLogin" component={CustomerLogin} />
      <Stack.Screen name="OwnerLogin" component={OwnerLogin} />
      <Stack.Screen name="CustomerRegister" component={CustomerRegister} />
      <Stack.Screen name="OwnerRegister" component={OwnerRegister} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
}
