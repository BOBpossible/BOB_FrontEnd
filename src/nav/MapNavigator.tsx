import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Map from '../screens/Map';

export type MapStackParamList = {
  Map: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

export const MapNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};
