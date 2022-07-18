import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Mission from '../screens/Mission';
import MissionSuccess from '../screens/MissionSuccess';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type MissionStackParamList = {
  Mission: undefined;
  MissionSuccess: undefined;
};

const Stack = createStackNavigator<MissionStackParamList>();

export const MissionNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'MissionSuccess') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName="Mission"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="Mission" component={Mission} />
      <Stack.Screen name="MissionSuccess" component={MissionSuccess} />
    </Stack.Navigator>
  );
};
