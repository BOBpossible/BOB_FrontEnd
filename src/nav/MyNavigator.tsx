import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPage from '../screens/MyPage';
import {MyReview} from '../screens/MyReview';
import {MyNotifications} from '../screens/MyNotifications';
import {MyInquiry} from '../screens/MyInquiry';
import {MyEditUserInfo} from '../screens/MyEditUserInfo';

export type MyStackParamList = {
  MyPage: undefined;
  MyEditUserInfo: undefined;
  MyReview: undefined;
  MyNotifications: undefined;
  MyInquiry: undefined;
};

const Stack = createStackNavigator<MyStackParamList>();

export const MyNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyEditUserInfo" component={MyEditUserInfo} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="MyNotifications" component={MyNotifications} />
      <Stack.Screen name="MyInquiry" component={MyInquiry} />
    </Stack.Navigator>
  );
};
