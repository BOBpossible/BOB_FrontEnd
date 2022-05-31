import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomerRegister from '../screens/customer/CustomerRegister';
import CustomerRegisterForm from '../screens/customer/CustomerRegisterForm';
import CustomerRegisterCategory from '../screens/customer/CustomerRegisterCategory';
import OwnerRegister from '../screens/owner/OwnerRegister';
import {MainNavigator} from './MainNavigator';

const Stack = createStackNavigator();
type RegisterNavigatorProps = {
  screenName: string;
};

export const RegisterNavigator: FC<RegisterNavigatorProps> = ({screenName}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={screenName}>
      <Stack.Screen name="CustomerRegister" component={CustomerRegister} />
      <Stack.Screen name="CustomerRegisterForm" component={CustomerRegisterForm} />
      <Stack.Screen name="CustomerRegisterCategory" component={CustomerRegisterCategory} />
      <Stack.Screen name="OwnerRegister" component={OwnerRegister} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
    </Stack.Navigator>
  );
};
