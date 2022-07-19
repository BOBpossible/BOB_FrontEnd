import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screens/Home/Main';
import {HomeMissionDetails} from '../screens/Home/HomeMissionDetails';
import {Notifications} from '../screens/Home/Notifications';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HowToLong from '../screens/onBoarding/HowToLong';
import {MyPoint} from '../screens/my/MyPoint';
import {MyChangePoint} from '../screens/my/MyChangePoint';
import {MyChangePointDone} from '../screens/my/MyChangePointDone';

export type HomeStackParamList = {
  Main: undefined;
  HomeMissionDetails: {missionId: number};
  Notifications: undefined;
  MissionNavigator: undefined;
  HowToLong: undefined;
  MyPoint: {point: number};
  MyChangePoint: {point: number};
  MyChangePointDone: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'Notifications' ||
      routeName === 'HomeMissionDetails' ||
      routeName === 'HowToLong' ||
      routeName === 'MyPoint' ||
      routeName === 'MyChangePoint' ||
      routeName === 'MyChangePointDone'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="HomeMissionDetails" component={HomeMissionDetails} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="HowToLong" component={HowToLong} />
      <Stack.Screen name="MyPoint" component={MyPoint} />
      <Stack.Screen name="MyChangePoint" component={MyChangePoint} />
      <Stack.Screen name="MyChangePointDone" component={MyChangePointDone} />
    </Stack.Navigator>
  );
};
