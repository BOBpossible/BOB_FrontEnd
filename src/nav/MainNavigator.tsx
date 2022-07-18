import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import Main from '../screens/Home/Main';
import Mission from '../screens/Mission';
import MyPage from '../screens/MyPage';
import {MyNavigator} from './MyNavigator';
import {HomeNavigator} from './HomeNavigator';

import type {RouteProp, ParamListBase} from '@react-navigation/native';
import {MapNavigator} from './MapNavigator';
import {View} from 'react-native';
import {useQuery} from 'react-query';
import {IMissionsProgress} from '../data';
import {queryKey} from '../api/queryKey';
import {getMissionsProgress} from '../api/mission';
import {MissionNavigator} from './MissionNavigator';
type TabBarIconProps = {focused: boolean; color: string; size: number};

const icons: Record<string, string[]> = {
  HomeNavigator: ['home', 'home-outline'],
  MissionNavigator: ['food', 'food-outline'],
  MapNavigator: ['map-search', 'map-search-outline'],
  MyNavigator: ['account-settings', 'account-settings-outline'],
};

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const {data} = useQuery<IMissionsProgress[]>(queryKey.MISSIONSPROGRESS, getMissionsProgress);

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
        return (
          <View>
            {name === 'MissionNavigator' && data?.length !== 0 && (
              <View
                style={{
                  backgroundColor: '#615DFF',
                  height: 5,
                  width: 5,
                  borderRadius: 5,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              />
            )}
            <Icon name={iconName} size={focusedSize} color={focusedColor} />
          </View>
        );
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    };
  };
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{tabBarLabel: '홈'}} />
      <Tab.Screen
        name="MissionNavigator"
        component={MissionNavigator}
        options={{tabBarLabel: '미션'}}
      />
      <Tab.Screen name="MapNavigator" component={MapNavigator} options={{tabBarLabel: '검색'}} />
      <Tab.Screen
        name="MyNavigator"
        component={MyNavigator}
        options={{tabBarLabel: '마이페이지'}}
      />
    </Tab.Navigator>
  );
};
