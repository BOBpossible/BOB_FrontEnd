import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../nav/HomeNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {NotificationCard} from '../components/NotificationCard';

const dummyMission = [
  {
    isNewMission: true,
    storeName: '새미션활성화가게',
    storeId: 1,
    mission: '20000원 이상',
    date: '2022.05.22 16:43',
    status: 1,
  },
  {
    isNewMission: false,
    storeName: '리뷰활성화가게',
    storeId: 13,
    mission: '15000원 이상',
    date: '2022.05.22 16:43',
    status: 1,
  },
  {
    isNewMission: true,
    storeName: '새미션비활성화가게',
    storeId: 144,
    mission: '17000원 이상',
    date: '2022.05.22 16:43',
    status: 0,
  },
  {
    isNewMission: false,
    storeName: '리뷰비활성화가게',
    storeId: 1433,
    mission: '18000원 이상',
    date: '2022.05.22 16:43',
    status: 0,
  },
];

type Props = NativeStackScreenProps<HomeStackParamList, 'Notifications'>;

export const Notifications = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'알림'} />
        <FlatList
          style={{marginLeft: 16, marginRight: 16}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60, marginTop: 12}}
          scrollEventThrottle={10}
          data={dummyMission}
          renderItem={({item}) => (
            <NotificationCard
              isNewMission={item.isNewMission}
              storeName={item.storeName}
              storeId={item.storeId}
              mission={item.mission}
              date={item.date}
              status={item.status}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  flexTop: {},
});
