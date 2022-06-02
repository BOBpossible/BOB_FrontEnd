import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerRegister from '../screens/Register';
import CustomerRegisterForm from '../screens/RegisterForm';
import CustomerRegisterCategory from '../screens/RegisterCategory';
import {MainNavigator} from './MainNavigator';

const Stack = createStackNavigator();

export const RegisterNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CustomerRegister" component={CustomerRegister} />
      <Stack.Screen name="CustomerRegisterForm" component={CustomerRegisterForm} />
      <Stack.Screen name="CustomerRegisterCategory" component={CustomerRegisterCategory} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};
