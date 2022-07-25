import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Map from '../screens/Map';
import {MapSearch} from '../screens/MapSearch';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type MapStackParamList = {
  Map: undefined;
  MapSearch: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

export const MapNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MapSearch') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator initialRouteName="Map" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="MapSearch" component={MapSearch} />
    </Stack.Navigator>
  );
};
