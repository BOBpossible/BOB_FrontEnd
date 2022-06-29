import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/Main';
import {HomeMissionDetails} from '../screens/HomeMissionDetails';
import {Notifications} from '../screens/Notifications';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type HomeStackParamList = {
  Main: undefined;
  HomeMissionDetails: undefined;
  Notifications: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Notifications') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="HomeMissionDetails" component={HomeMissionDetails} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};
