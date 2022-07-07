import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {MissionSuccessfulCard} from './MissionSuccessfulCard';
import {customAxios} from '../api/customAxios';
import {useRecoilValue} from 'recoil';
import {userToken} from '../state';

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
interface DataResponse {
  mission: string;
  missionId: number;
  missionStatus: string; //NEW, PROGRESS, OWNER_CHECK
  point: number;
  storeCategory: string;
  storeName: string;
}

export const MissionSuccessList = () => {
  const token = useRecoilValue(userToken);
  const [CompletedMissionsData, setCompletedMissionsData] = useState<DataResponse[]>([]);

  const getMissionsMeComplete = async () => {
    const res = await customAxios(token).get('missions/me/complete');
    console.log('getMissionsMeProgress res.data : ', res.data);
    res.data.result.forEach((e: any) => {
      setCompletedMissionsData((prev) => [
        ...prev,
        {
          mission: e.mission,
          missionId: e.missionId,
          missionStatus: e.missionStatus,
          point: e.point,
          storeCategory: e.storeCategory,
          storeName: e.storeName,
        },
      ]);
    });
    // CompletedMissionsData.length로할지, typeof(CompletedMissionsData);
    // var noMission = useState(CompletedMissionsData.length === 0); //미션이없는상태면 true
    // var 스코프 호출되는지 확인
  };
  return (
    <FlatList
      style={{marginTop: 18}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60, backgroundColor: '#F6F6FA'}}
      scrollEventThrottle={10}
      data={dummyMission}
      // data={CompletedMissionsData}
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
            // mission={item.mission}
            // missionId={item.missionId}
            // // missionStatus={item.missionStatus}
            // point={item.poin}
            // storeCategory={item.storeCategory}
            // storeName={item.storeName}
            // successDate={'2022-07-07T07:43:57.267Z'}
          />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
    />
  );
};
