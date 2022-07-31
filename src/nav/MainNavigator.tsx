import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();
import {MyNavigator} from './MyNavigator';
import {HomeNavigator} from './HomeNavigator';

import type {RouteProp, ParamListBase} from '@react-navigation/native';
import {MapNavigator} from './MapNavigator';
import {Image, StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';
import {IMissionsProgress} from '../data';
import {queryKey} from '../api/queryKey';
import {getMissionsProgress} from '../api/mission';
import {MissionNavigator} from './MissionNavigator';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  const {data} = useQuery<IMissionsProgress[]>(queryKey.MISSIONSPROGRESS, getMissionsProgress);

  const screenOptions = () => {
    return {
      headerShown: false,
      tabBarShowLabel: true,
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
                  style={styles.image}
                  resizeMode="contain"
                />
              );
            } else {
              return <Image source={require('../assets/icons/home.png')} style={styles.image} />;
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
                  {data?.length !== 0 && <View style={styles.badge} />}
                  <Image
                    source={require('../assets/icons/noodleFocus.png')}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              );
            } else {
              return (
                <View>
                  {data?.length !== 0 && <View style={styles.badge} />}
                  <Image
                    source={require('../assets/icons/noodle.png')}
                    style={styles.image}
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
                  style={styles.image}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/icons/map.png')}
                  style={styles.image}
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
                  style={styles.image}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Image
                  source={require('../assets/icons/user.png')}
                  style={styles.image}
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

const styles = StyleSheet.create({
  image: {width: 24, height: 24},
  badge: {
    backgroundColor: '#615DFF',
    height: 5,
    width: 5,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
