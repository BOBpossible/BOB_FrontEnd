import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {MissionCard} from '../components';
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
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60, backgroundColor: '#F6F6FA'}}
      scrollEventThrottle={10}
      data={dummyMission}
      renderItem={({item}) => (
        <>
          <View style={[styles.missionDate]}>
            <Text>
              {item.completeMonth}/{item.completeDate}({item.completeDay}) • {item.completeStatus}
            </Text>
          </View>
          <MissionCard
            name={item.name}
            category={item.category}
            day={item.day}
            minCost={item.minCost}
            point={item.point}
            status="review"
            handleOnPress={review}
          />
        </>
      )}
      ListHeaderComponent={
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 16,
              marginRight: 16,
              marginTop: 12,
              marginBottom: 9,
            }}
          >
            <Text style={{fontSize: 18, color: '#616161'}}>최근 일주일</Text>
            <Icon name="chevron-down" size={25} />
            {/* 이거 토글 ? ?  */}
          </View>
        </TouchableOpacity>
      }
      ItemSeparatorComponent={() => <View style={{margin: 16}} />}
    />
  );
};
