import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Platform, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeMissionCard} from '../../components/Home/HomeMissionCard';
import {AnimatedHeader, HomeMissionListHeader} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {ConnectionError} from '../../components/ConnectionError';
import {IHomeData, IMissionsProgress} from '../../data';
import {queryKey} from '../../api/queryKey';
import {HomeNoMission} from '../../components/Home/HomeNoMission';
import {getHomeInfo} from '../../api';
import {getMissionsProgress} from '../../api/mission';

const Main = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const homeData = useQuery<IHomeData>(queryKey.HOMEDATA, getHomeInfo, {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const DataMissionsProgress = useQuery<IMissionsProgress[]>(
    queryKey.MISSIONSPROGRESS,
    getMissionsProgress,
  );

  if (homeData.isError) {
    console.log('Home Error', homeData.error);
    return <ConnectionError refetch={homeData.refetch} />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.flex}>
      {homeData.isLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      ) : homeData.data?.missions === null ? (
        <>
          <AnimatedHeader animatedValue={offset} paddingTop={insets.top} data={homeData.data} />
          <HomeNoMission />
        </>
      ) : (
        <>
          <AnimatedHeader animatedValue={offset} paddingTop={insets.top} data={homeData.data} />
          <Animated.FlatList
            style={DataMissionsProgress.data?.length !== 0 && {opacity: 0.5}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.missionListContainer]}
            scrollEventThrottle={10}
            data={homeData.data?.missions}
            renderItem={({item}) => (
              <HomeMissionCard
                mission={item.mission}
                missionId={item.missionId}
                status={item.missionStatus}
                point={item.point}
                category={item.storeCategory}
                name={item.storeName}
                challengeStatus={DataMissionsProgress.data?.length !== 0}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<HomeMissionListHeader dday={homeData.data?.dday} />}
            onScroll={(event) => {
              Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
                useNativeDriver: false,
              })(event);
            }}
            ListFooterComponent={() => <View />}
            ListFooterComponentStyle={{marginTop: 100}}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  missionListContainer: {
    paddingTop: Platform.OS === 'ios' ? hp((230 / 812) * 100) : hp(calHeight(230)),
    paddingBottom: 10,
    backgroundColor: '#F6F6FA',
  },
  flex: {
    flex: 1,
    backgroundColor: '#F6F6FA',
  },
});
