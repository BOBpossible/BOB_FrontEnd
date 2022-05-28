import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from '../screens/Main';
import Mission from '../screens/Mission';
import Map from '../screens/Map';
import MyPage from '../screens/MyPage';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Mission" component={Mission} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
