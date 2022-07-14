import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/onBoarding/Login';
import {MainNavigator} from './MainNavigator';
import Register from '../screens/onBoarding/Register';
import RegisterForm from '../screens/onBoarding/RegisterForm';
import RegisterCategory from '../screens/onBoarding/RegisterCategory';
import RegisterDone from '../screens/onBoarding/RegisterDone';
import HowTo1 from '../screens/onBoarding/HowTo1';
import HowTo2 from '../screens/onBoarding/HowTo2';
import HowTo3 from '../screens/onBoarding/HowTo3';
import HowTo4 from '../screens/onBoarding/HowTo4';
import HowTo5 from '../screens/onBoarding/HowTo5';
import HowTo6 from '../screens/onBoarding/HowTo6';
import {RegisterInterface} from '../data';
import RegisterContract from '../screens/onBoarding/RegisterContract';

export type AuthStackParamList = {
  Login: undefined;
  KakaoLogin: undefined;
  Register: undefined;
  RegisterForm: {registerData: RegisterInterface};
  RegisterCategory: {registerData: RegisterInterface};
  RegisterDone: undefined;
  HowTo1: undefined;
  HowTo2: undefined;
  HowTo3: undefined;
  HowTo4: undefined;
  HowTo5: undefined;
  HowTo6: undefined;
  MainNavigator: undefined;
  RegisterContract: {type: number};
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterForm" component={RegisterForm} />
      <Stack.Screen name="RegisterCategory" component={RegisterCategory} />
      <Stack.Screen name="RegisterDone" component={RegisterDone} />
      <Stack.Screen name="HowTo1" component={HowTo1} />
      <Stack.Screen name="HowTo2" component={HowTo2} />
      <Stack.Screen name="HowTo3" component={HowTo3} />
      <Stack.Screen name="HowTo4" component={HowTo4} />
      <Stack.Screen name="HowTo5" component={HowTo5} />
      <Stack.Screen name="HowTo6" component={HowTo6} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen name="RegisterContract" component={RegisterContract} />
    </Stack.Navigator>
  );
};
