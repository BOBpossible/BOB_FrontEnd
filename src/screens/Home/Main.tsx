import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Platform, Text, ActivityIndicator} from 'react-native';
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
import {HomeBobpool} from '../../components/Home/HomeBobpool';
import {getHomeInfo} from '../../api';
import {getMissionsProgress} from '../../api/mission';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation();
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [allDone, setAllDone] = useState(false);

  const homeData = useQuery<IHomeData>(queryKey.HOMEDATA, getHomeInfo, {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log('homeData', data);
      if (data.missions !== null) {
        const allDoneStatus = data.missions.every((element) => element.missionStatus === 'DONE');
        // data.missions.map((e: any) => {
        //   if (e.missionStatus === 'DONE') {
        //     setAllDone(false); //이번주 세개의 미션 모두 DONE이면 true유지
        //   }
        // });
        setAllDone(allDoneStatus);
      }
    },
  });

  useFocusEffect(
    useCallback(() => {
      homeData.refetch();
    }, []),
  );

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
            ListHeaderComponent={<HomeBobpool category={'NO'} />}
            onScroll={(event) => {
              Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
                useNativeDriver: false,
              })(event);
            }}
          />
        </>
      ) : (
        <>
          <AnimatedHeader animatedValue={offset} paddingTop={insets.top} data={homeData.data} />
          {allDone ? ( //미션 모두 완료한 경우
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
              ListHeaderComponent={<HomeBobpool category={'DONE'} />}
              onScroll={(event) => {
                Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
                  useNativeDriver: false,
                })(event);
              }}
            />
          ) : (
            <>
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
                ListHeaderComponent={
                  <HomeMissionListHeader dday={homeData.data?.dday} allDone={allDone} />
                }
                onScroll={(event) => {
                  Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
                    useNativeDriver: false,
                  })(event);
                }}
                ListFooterComponent={() => <View />}
                ListFooterComponentStyle={styles.mainPaddingBottom}
              />
            </>
          )}
        </>
      )}
      {DataMissionsProgress.data?.length !== 0 && (
        <View
          style={[
            DesignSystem.centerArrange,
            {
              width: '50%',
              left: '12.5%',
              position: 'absolute',
              bottom: -20,
              zIndex: 10,
            },
          ]}
        >
          <View style={[styles.NEWBallon, DesignSystem.centerArrange]}>
            <Text style={[styles.ballonText]}>진행중인 미션이 있어요! </Text>
          </View>
          <Icon name="menu-down" size={24} style={[styles.headerIconStyle]} />
        </View>
      )}
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
  NEWBallon: {
    //말풍선
    backgroundColor: '#6C69FF',
    borderRadius: 6,
    paddingRight: 13,
    paddingLeft: 13,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerIconStyle: {
    top: -11,
    color: '#6C69FF',
    elevation: 10,
  },
  ballonText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  mainPaddingBottom: {
    paddingBottom: Platform.OS === 'ios' ? hp(calHeight(80, true)) : hp(calHeight(80)),
  },
});
