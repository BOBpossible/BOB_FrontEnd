import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/Home/Main';
import {HomeMissionDetails} from '../screens/Home/HomeMissionDetails';
import {Notifications} from '../screens/Home/Notifications';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HowToLong from '../screens/onBoarding/HowToLong';

export type HomeStackParamList = {
  Main: undefined;
  HomeMissionDetails: {missionId: number};
  Notifications: undefined;
  Mission: {missionId: number};
  HowToLong: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'Notifications' ||
      routeName === 'HomeMissionDetails' ||
      routeName === 'HowToLong'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="HomeMissionDetails" component={HomeMissionDetails} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="HowToLong" component={HowToLong} />
    </Stack.Navigator>
  );
};
