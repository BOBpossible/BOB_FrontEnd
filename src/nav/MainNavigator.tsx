import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import {MyNavigator} from './MyNavigator';
import {HomeNavigator} from './HomeNavigator';

import type {RouteProp, ParamListBase} from '@react-navigation/native';
import {MapNavigator} from './MapNavigator';
import {Image, View} from 'react-native';
import {useQuery} from 'react-query';
import {IMissionsProgress} from '../data';
import {queryKey} from '../api/queryKey';
import {getMissionsProgress} from '../api/mission';
import {MissionNavigator} from './MissionNavigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const {data} = useQuery<IMissionsProgress[]>(queryKey.MISSIONSPROGRESS, getMissionsProgress);

  const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
    return {
      headerShown: false,
      tabBarShowLabel: true,
      // tabBarIcon: ({focused, size}: TabBarIconProps) => {
      //   const {name} = route;
      //   const focusedSize = focused ? size + 6 : size;
      //   const focusedColor = focused ? Colors.black : color;
      //   const [icon, iconOutline] = icons[name];
      //   const iconName = focused ? icon : iconOutline;
      //   return (
      //     <View>
      //       {name === 'MissionNavigator' && data?.length !== 0 && (
      //         <View
      //           style={{
      //             backgroundColor: '#615DFF',
      //             height: 5,
      //             width: 5,
      //             borderRadius: 5,
      //             position: 'absolute',
      //             top: 0,
      //             right: 0,
      //           }}
      //         />
      //       )}
      //       <Icon name={iconName} size={focusedSize} color={focusedColor} />
      //     </View>
      //   );
      // },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    };
  };
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Main">
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icons/homeFocus.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/icons/home.png')}
                  style={{width: 24, height: 24}}
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="MissionNavigator"
        component={MissionNavigator}
        options={{
          tabBarLabel: '미션',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <View>
                  {data?.length !== 0 && (
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
                  <Image
                    source={require('../assets/icons/noodleFocus.png')}
                    style={{width: 24, height: 24}}
                    resizeMode="contain"
                  />
                </View>
              );
            } else {
              return (
                <View>
                  {data?.length !== 0 && (
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
                  <Image
                    source={require('../assets/icons/noodle.png')}
                    style={{width: 24, height: 24}}
                    resizeMode="contain"
                  />
                </View>
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="MapNavigator"
        component={MapNavigator}
        options={{
          tabBarLabel: '검색',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icons/mapFocus.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/icons/map.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="MyNavigator"
        component={MyNavigator}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return (
                <Image
                  source={require('../assets/icons/userFocus.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/icons/user.png')}
                  style={{width: 24, height: 24}}
                  resizeMode="contain"
                />
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};
