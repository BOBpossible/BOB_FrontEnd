import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {MissionSuccessfulCard} from './MissionSuccessfulCard';
import {customAxios} from '../../api/customAxios';
import {useRecoilValue} from 'recoil';
import {userToken} from '../../state';

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
interface DataCompletedMissionsType {
  dayOfWeek: string;
  mission: string;
  missionId: number;
  missionStatus: string; ///NEW, PROGRESS, OWNER_CHECK
  point: number;
  storeCategory: string;
  storeName: string;
  successDate: string;
}
export const MissionSuccessList = () => {
  const token = useRecoilValue(userToken);
  const [DataCompletedMissions, setDataCompletedMissions] = useState<DataCompletedMissionsType[]>([]);

  const getMissionsMeComplete = async () => {
    const res = await customAxios(token).get('missions/me/complete');
    console.log('getMissionsMeProgress res.data : ', res.data);
    res.data.result.forEach((e: any) => {
      setDataCompletedMissions((prev) => [
        ...prev,
        {
          dayOfWeek: e.dayOfWeek,
          mission: e.mission,
          missionId: e.missionId,
          missionStatus: e.missionStatus,
          point: e.point,
          storeCategory: e.storeCategory,
          storeName: e.storeName,
          successDate: e.successDate,
        },
      ]);
    });
    // DataCompletedMissions.length로할지, typeof(DataCompletedMissions);
    // var noMission = useState(DataCompletedMissions.length === 0); //미션이없는상태면 true
    // var 스코프 호출되는지 확인
  };
  //prettier-ignore
  const DAYOFWEEK = {
    MONDAY: '월', TUESDAY: '화', WEDNESSDAY: '수', THURSDAY: '목', FRIDAY: '금', SATURDAY: '토', SUNDAY: '일',
  };
  // useEffect(() => {
  // prettier-ignore
  //   const DAYOFWEEK = {
  //     MONDAY: '월', TUESDAY: '화', WEDNESSDAY: '수', THURSDAY: '목', FRIDAY: '금', SATURDAY: '토', SUNDAY: '일',
  //   };
  //   // console.log(DAYOFWEEK['MONDAY']);
  // }, []); ///왜 미션갯수만큼렌더링???
  return (
    <FlatList
      style={{marginTop: 18}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60, backgroundColor: '#F6F6FA'}}
      scrollEventThrottle={10}
      data={dummyMission}
      // data={DataCompletedMissions}
      renderItem={({item}) => (
        <>
          <MissionSuccessfulCard
            mission={'10000원 이상'}
            missionId={1}
            // missionStatus={status}
            point={500}
            storeCategory={'중국집'}
            storeName={'반이학생마라탕'}
            successDate={'2022-07-07T07:43:57.267Z'}
            dayOfWeek={DAYOFWEEK['MONDAY']}
            // mission={item.mission}
            // missionId={item.missionId}
            // // missionStatus={item.missionStatus}
            // point={item.poin}
            // storeCategory={item.storeCategory}
            // storeName={item.storeName}
            // successDate={item.successDate}
            // dayOfWeek={DAYOFWEEK[item.dayOfWeek]}
          />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
    />
  );
};
