import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {MissionCard} from '../components';
import {MissionSuccessfulCard} from './MissionSuccessfulCard';
import {useRecoilState} from 'recoil';
import {userToken} from '../state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const dummyMission = [
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
    completeMonth: 2,
    completeDate: 20,
    completeDay: '월',
    completeStatus: '미션 성공',
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
    completeMonth: 2,
    completeDate: 20,
    completeDay: '월',
    completeStatus: '미션 성공',
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
    completeMonth: 2,
    completeDate: 20,
    completeDay: '월',
    completeStatus: '미션 성공',
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
    completeMonth: 2,
    completeDate: 20,
    completeDay: '월',
    completeStatus: '미션 성공',
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
    completeMonth: 2,
    completeDate: 20,
    completeDay: '월',
    completeStatus: '미션 성공',
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
    completeMonth: 2,
    completeDate: 20,
    completeDay: '월',
    completeStatus: '미션 성공',
  },
];

export const MissionSuccessList = () => {
  const [token, setToken] = useRecoilState(userToken);
  console.log(token);
  function review() {
    console.log('잘먹었습니다~');
  }
  const styles = StyleSheet.create({
    missionDate: {
      alignItems: 'center',
      marginBottom: 2,
    },
    missionDateText: {
      color: '#616161',
      fontSize: 14,
    },
  });
  return (
    <FlatList
      style={{marginTop: 18}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60, backgroundColor: '#F6F6FA'}}
      scrollEventThrottle={10}
      data={dummyMission}
      renderItem={({item}) => (
        <>
          <MissionSuccessfulCard
            name={item.name}
            category={item.category}
            day={item.day}
            minCost={item.minCost}
            point={item.point}
            completeMonth={item.completeMonth}
            completeDate={item.completeDate}
            completeDay={item.completeDay}
            completeStatus={item.completeStatus}
            // handleOnPress={review}
          />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
    />
  );
};
