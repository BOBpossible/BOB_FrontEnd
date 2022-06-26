import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/Main';
import {HomeMissionDetails} from '../screens/HomeMissionDetails';

export type HomeStackParamList = {
  Main: undefined;
  HomeMissionDetails: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="HomeMissionDetails" component={HomeMissionDetails} />
    </Stack.Navigator>
  );
};
