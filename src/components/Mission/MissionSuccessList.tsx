import React from 'react';
import {View, FlatList} from 'react-native';
import {MissionSuccessfulCard} from './MissionSuccessfulCard';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getMissionsComplete} from '../../api/mission';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';

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
  const DataMissionsComplete = useQuery(queryKey.MISSIONSCOMPLETE, getMissionsComplete);
  // console.log('DataMissionsComplete: ', DataMissionsComplete);//DataMissionsComplete.data.~

  //prettier-ignore
  const DAYOFWEEK = {
    MONDAY: '월', TUESDAY: '화', WEDNESSDAY: '수', THURSDAY: '목', FRIDAY: '금', SATURDAY: '토', SUNDAY: '일',
  };
  return (
    <FlatList
      style={{marginTop: hp(calHeight(16))}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: hp(calHeight(16)), backgroundColor: '#F6F6FA'}}
      scrollEventThrottle={10}
      data={dummyMission}
      // data={DataMissionsComplete.data.result}
      renderItem={({item}) => (
        <>
          <MissionSuccessfulCard
            mission={'10000원 이상'}
            missionId={1}
            // missionStatus={status}
            point={500}
            storeCategory={'중국집'}
            storeId={31}
            storeName={'반이학생마라123탕'}
            successDate={'2022-07-07T07:43:57.267Z'}
            dayOfWeek={DAYOFWEEK['MONDAY']}
            // dayOfWeek={DAYOFWEEK[item.dayOfWeek]}
            // mission={item.mission}
            // missionId={item.missionId}
            // point={item.point}
            // storeCategory={item.storeCategory}
            // storeId={item.storeId}
            // storeName={item.storeName}
            // successDate={item.successDate}
          />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
    />
  );
};
