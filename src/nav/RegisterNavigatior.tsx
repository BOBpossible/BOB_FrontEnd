import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../screens/Register';
import RegisterForm from '../screens/RegisterForm';
import RegisterCategory from '../screens/RegisterCategory';
import {MainNavigator} from './MainNavigator';

const Stack = createStackNavigator();

export const RegisterNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="RegisterCategory" component={RegisterCategory} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};
