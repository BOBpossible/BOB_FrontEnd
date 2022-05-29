import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import Main from '../screens/customer/Main';
import Mission from '../screens/customer/Mission';
import Map from '../screens/customer/Map';
import MyPage from '../screens/customer/MyPage';

import type {RouteProp, ParamListBase} from '@react-navigation/native';
type TabBarIconProps = {focused: boolean; color: string; size: number};

const icons: Record<string, string[]> = {
  Main: ['home', 'home-outline'],
  Mission: ['food', 'food-outline'],
  Map: ['map-search', 'map-search-outline'],
  MyPage: ['account-settings', 'account-settings-outline'],
};

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
      const {name} = route;
      const focusedSize = focused ? size + 6 : size;
      const focusedColor = focused ? Colors.black : color;
      const [icon, iconOutline] = icons[name];
      const iconName = focused ? icon : iconOutline;
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
    },
  };
};

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Mission" component={Mission} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
}
