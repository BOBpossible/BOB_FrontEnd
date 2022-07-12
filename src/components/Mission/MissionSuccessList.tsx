import React from 'react';
import {View, FlatList} from 'react-native';
import {MissionSuccessfulCard} from './MissionSuccessfulCard';
import {useQuery} from 'react-query';
import {queryKey} from '../../api/queryKey';
import {getMissionsComplete} from '../../api/mission';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';

interface dayofweekType {
  MONDAY: string;
  TUESDAY: string;
  WEDNESDAY: string;
  THURSDAY: string;
  FRIDAY: string;
  SATURDAY: string;
  SUNDAY: string;
}

export const MissionSuccessList = () => {
  const DataMissionsComplete = useQuery(queryKey.MISSIONSCOMPLETE, getMissionsComplete);
  // console.log('DataMissionsComplete: ', DataMissionsComplete.data);//DataMissionsComplete.data.~

  //prettier-ignore
  const DAYOFWEEK: dayofweekType = {
    'MONDAY': '월', 'TUESDAY': '화', 'WEDNESDAY': '수', 'THURSDAY': '목', 'FRIDAY': '금', 'SATURDAY': '토', 'SUNDAY': '일',
  };

  return (
    <FlatList
      style={{marginTop: hp(calHeight(16))}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: hp(calHeight(16)), backgroundColor: '#F6F6FA'}}
      scrollEventThrottle={10}
      // data={dummyMission}
      data={DataMissionsComplete.data}
      renderItem={({item}) => (
        <>
          <MissionSuccessfulCard
            // mission={'10000원 이상'}
            // missionId={1}
            // // missionStatus={status}
            // point={500}
            // storeCategory={'중국집'}
            // storeId={31}
            // storeName={'반이학생마라123탕'}
            // successDate={'2022-07-07T07:43:57.267Z'}
            dayOfWeek={DAYOFWEEK[item.dayOfWeek]}
            // dayOfWeek={item.dayOfWeek}
            mission={item.mission}
            missionId={item.missionId}
            point={item.point}
            storeCategory={item.storeCategory}
            storeId={item.storeId}
            storeName={item.storeName}
            successDate={item.successDate}
          />
        </>
      )}
      ItemSeparatorComponent={() => <View style={{marginTop: 16}} />}
    />
  );
};
