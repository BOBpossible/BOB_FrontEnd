import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../screens/MyPage';
import {MyReview} from '../screens/MyReview';
import {MyNotificationsSetting} from '../screens/MyNotificationsSetting';
import {MyInquiry} from '../screens/MyInquiry';
import {MyEditUserInfo} from '../screens/MyEditUserInfo';
import {MyPoint} from '../screens/MyPoint';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {MyChangePoint} from '../screens/MyChangePoint';
import {MyChangePointDone} from '../screens/MyChangePointDone';

export type MyStackParamList = {
  MyPage: undefined;
  MyEditUserInfo: {username: string};
  MyPoint: {point: number};
  MyReview: undefined;
  MyNotificationsSetting: undefined;
  MyInquiry: undefined;
  MyChangePoint: undefined;
  MyChangePointDone: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

export const MyNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === 'MyEditUserInfo' ||
      routeName === 'MyPoint' ||
      routeName === 'MyReview' ||
      routeName === 'MyNotificationsSetting' ||
      routeName === 'MyInquiry' ||
      routeName === 'MyChangePoint' ||
      routeName === 'MyChangePointDone'
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
      <Stack.Screen name="MyEditUserInfo" component={MyEditUserInfo} />
      <Stack.Screen name="MyPoint" component={MyPoint} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="MyNotificationsSetting" component={MyNotificationsSetting} />
      <Stack.Screen name="MyInquiry" component={MyInquiry} />
      <Stack.Screen name="MyChangePoint" component={MyChangePoint} />
      <Stack.Screen name="MyChangePointDone" component={MyChangePointDone} />
    </Stack.Navigator>
  );
};
