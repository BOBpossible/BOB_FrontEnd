import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../screens/my/MyPage';
import {MyReview} from '../screens/my/MyReview';
import {MyNotificationsSetting} from '../screens/my/MyNotificationsSetting';
import {MyInquiry} from '../screens/my/MyInquiry';
import {MyPoint} from '../screens/my/MyPoint';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {MyChangePoint} from '../screens/my/MyChangePoint';
import {MyChangePointDone} from '../screens/my/MyChangePointDone';
import {AuthNavigator} from './AuthNavigator';
import {MyEditUserInfo} from '../screens/my/MyEditUserInfo';

export type MyStackParamList = {
  MyPage: undefined;
  MyPoint: {point: number};
  MyReview: undefined;
  MyNotificationsSetting: undefined;
  MyInquiry: undefined;
  MyChangePoint: {point: number};
  MyChangePointDone: undefined;
  AuthNavigator: undefined;
  MyEditUserInfo: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

export const MyNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'MyPoint' ||
      routeName === 'MyReview' ||
      routeName === 'MyNotificationsSetting' ||
      routeName === 'MyInquiry' ||
      routeName === 'MyChangePoint' ||
      routeName === 'MyChangePointDone' ||
      routeName === 'MyEditUserInfo' ||
      routeName === 'AuthNavigator'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyPoint" component={MyPoint} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="MyNotificationsSetting" component={MyNotificationsSetting} />
      <Stack.Screen name="MyInquiry" component={MyInquiry} />
      <Stack.Screen name="MyChangePoint" component={MyChangePoint} />
      <Stack.Screen name="MyChangePointDone" component={MyChangePointDone} />
      <Stack.Screen name="MyEditUserInfo" component={MyEditUserInfo} />
      <Stack.Screen
        name="AuthNavigator"
        component={AuthNavigator}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
