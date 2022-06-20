import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import Main from '../screens/Main';
import Mission from '../screens/Mission';
import MyPage from '../screens/MyPage';

import type {RouteProp, ParamListBase} from '@react-navigation/native';
import {MapNavigator} from './MapNavigator';
type TabBarIconProps = {focused: boolean; color: string; size: number};

const icons: Record<string, string[]> = {
  Main: ['home', 'home-outline'],
  Mission: ['food', 'food-outline'],
  MapNavigator: ['map-search', 'map-search-outline'],
  MyPage: ['account-settings', 'account-settings-outline'],
};

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
  return {
    headerShown: false,
    tabBarShowLabel: true,
    tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
      const {name} = route;
      const focusedSize = focused ? size + 6 : size;
      const focusedColor = focused ? Colors.black : color;
      const [icon, iconOutline] = icons[name];
      const iconName = focused ? icon : iconOutline;
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />;
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
  };
};

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
      <Tab.Screen name="Main" component={Main} options={{tabBarLabel: '홈'}} />
      <Tab.Screen name="Mission" component={Mission} options={{tabBarLabel: '미션'}} />
      <Tab.Screen name="MapNavigator" component={MapNavigator} options={{tabBarLabel: '검색'}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{tabBarLabel: '마이페이지'}} />
    </Tab.Navigator>
  );
};
