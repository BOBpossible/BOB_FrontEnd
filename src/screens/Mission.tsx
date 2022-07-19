import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Alert, RefreshControl} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import {MissionCard} from '../components';
import {MissionProcess} from '../components/Mission/MissionProcess';
import {MissionProgressSwitch} from '../components/Mission/MissionProgressSwitch';
import {MissionSuccessList} from '../components/Mission/MissionSuccessList';
import {MissionUser} from '../components/Mission/MissionUser';
import {MissionNo} from '../components/Mission/MissionNo';
import {useQuery} from 'react-query';
import {queryKey} from '../api/queryKey';
import {getMissionsComplete, getMissionsProgress} from '../api/mission';
import {IMissionsProgress, IgetUsersMe, IMissionSuccess} from '../data';
import {getUserInfo} from '../api/user';
import {ConnectionError} from '../components/ConnectionError';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {missionPage} from '../state';
import {useRecoilValue} from 'recoil';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

//processCircle
///"PROGRESS","CHECKING" :'진행중' ---  "DONE" : '도전 성공'

//도전 전 NEW  성공요청 PROGRESS  성공요청중 CHECKING    성공 DONE

const Mission = () => {
  const progressnow = useRecoilValue(missionPage);
  const navigation = useNavigation();
  const DataMissionsProgress = useQuery<IMissionsProgress[]>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );

  const DataMissionsComplete = useQuery<IMissionSuccess[]>(
    queryKey.MISSIONSCOMPLETE,
    getMissionsComplete,
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      if (remoteMessage.data.title === 'missionSuccess') {
        DataMissionsProgress.refetch();
        console.log('미션 업데이트!');
      }
    });

    return unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      DataMissionsProgress.refetch();
      DataMissionsComplete.refetch();
    }, []),
  );

  const DataUser = useQuery<IgetUsersMe>('userInfo', getUserInfo);

  const onPressRequestBtn = () => {
    console.log('성공요청전송: PROGRESS->CHECKING');
  };
  if (DataUser.isError || DataMissionsProgress.isError) {
    return <ConnectionError refetch={DataMissionsProgress.refetch} />;
  }

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F6F6FA'}]}>
        <View style={[styles.headerWrap]}>
          <View style={[styles.header]}>
            <Text style={[DesignSystem.h2SB, {color: 'black'}]}>미션</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          {progressnow ? (
            DataMissionsProgress.data?.length === 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[DesignSystem.centerArrange, {flex: 1}]}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => DataMissionsProgress.refetch()}
                    refreshing={DataMissionsProgress.isLoading}
                  />
                }
              >
                <MissionNo />
                <TouchableOpacity onPress={() => navigation.navigate('MissionSuccess')}>
                  <Text>포인트 적립 성공 창 가기</Text>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    onRefresh={() => DataMissionsProgress.refetch()}
                    refreshing={DataMissionsProgress.isLoading}
                  />
                }
              >
                <MissionProcess status={DataMissionsProgress.data?.[0].missionStatus} />
                <MissionUser username={DataUser.data?.name} phone={DataUser.data?.phone} />
                <MissionCard
                  mission={DataMissionsProgress.data?.[0].mission}
                  missionId={DataMissionsProgress.data?.[0].missionId}
                  missionStatus={DataMissionsProgress.data?.[0].missionStatus}
                  point={DataMissionsProgress.data?.[0].point}
                  storeCategory={DataMissionsProgress.data?.[0].storeCategory}
                  storeName={DataMissionsProgress.data?.[0].storeName}
                  onPressRequestBtn={onPressRequestBtn}
                />
              </ScrollView>
            )
          ) : DataMissionsComplete.data?.length === 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[DesignSystem.centerArrange, {flex: 1}]}
              refreshControl={
                <RefreshControl
                  onRefresh={() => DataMissionsComplete.refetch()}
                  refreshing={DataMissionsComplete.isLoading}
                />
              }
            >
              <MissionNo />
            </ScrollView>
          ) : (
            <MissionSuccessList />
          )}
        </View>
        <MissionProgressSwitch />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#FFFFFF'},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginLeft: 16,
  },
});

export default Mission;
