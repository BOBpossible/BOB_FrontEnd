import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../screens/MyPage';
import {MyReview} from '../screens/MyReview';
import {MyNotifications} from '../screens/MyNotifications';
import {MyInquiry} from '../screens/MyInquiry';
import {MyEditUserInfo} from '../screens/MyEditUserInfo';
import {MyPoint} from '../screens/MyPoint';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type MyStackParamList = {
  MyPage: undefined;
  MyEditUserInfo: undefined;
  MyPoint: undefined;
  MyReview: undefined;
  MyNotifications: undefined;
  MyInquiry: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

export const MyNavigator = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName !== 'MyPage') {
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
      <Stack.Screen name="MyNotifications" component={MyNotifications} />
      <Stack.Screen name="MyInquiry" component={MyInquiry} />
    </Stack.Navigator>
  );
};
