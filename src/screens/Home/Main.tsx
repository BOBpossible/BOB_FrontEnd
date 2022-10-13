import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Platform, ActivityIndicator, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AnimatedHeader} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {ConnectionError} from '../../components/ConnectionError';
import {IHomeData, IMissionsProgress, INotiType} from '../../data';
import {queryKey} from '../../api/queryKey';
import {getHomeInfo, getNotificationsMain} from '../../api';
import {getMissionsProgress} from '../../api/mission';
import {DesignSystem} from '../../assets/DesignSystem';
import {useFocusEffect} from '@react-navigation/native';
import {HomeMissionList} from '../../components/Home/HomeMissionList';
import {HomeFloatMessage} from '../../components/Home/HomeFloatMessage';

const Main = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [allDone, setAllDone] = useState(false);
  const [newNotiCount, setNewNotiCount] = useState(0);

  const notificationData = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotificationsMain, {
    onSuccess: (data) => {
      const countNewNoti = data.filter((element) => !element.checked);
      setNewNotiCount(countNewNoti.length);
    },
  });

  const homeData = useQuery<IHomeData>(queryKey.HOMEDATA, getHomeInfo, {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log('homeData', data);
      if (data.missions !== null) {
        const allDoneStatus = data.missions.every((element) => element.missionStatus === 'DONE');
        setAllDone(allDoneStatus);
      }
    },
  });

  const DataMissionsProgress = useQuery<IMissionsProgress[]>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );

  useFocusEffect(
    useCallback(() => {
      homeData.refetch();
      notificationData.refetch();
    }, []),
  );

  if (homeData.isError) {
    console.log('Home Error', homeData.error);
    return <ConnectionError refetch={homeData.refetch} />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      {homeData.isLoading ? (
        <View style={DesignSystem.centerArrange}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <AnimatedHeader
            animatedValue={offset}
            paddingTop={insets.top}
            data={homeData.data}
            newNotiCount={newNotiCount}
          />
          <HomeMissionList homeData={homeData.data} offset={offset} allDone={allDone} />
        </>
      )}
      {DataMissionsProgress.data?.length !== 0 && <HomeFloatMessage />}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  missionListContainer: {
    paddingTop: Platform.OS === 'ios' ? hp(calHeight(230, true)) : hp(calHeight(230)),
    paddingBottom: 10,
    backgroundColor: '#F6F6FA',
  },
  flex: {
    flex: 1,
    backgroundColor: '#F6F6FA',
  },
});
