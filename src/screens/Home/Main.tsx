import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  Text,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeMissionCard} from '../../components/Home/HomeMissionCard';
import {AnimatedHeader, HomeMissionListHeader} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {ConnectionError} from '../../components/ConnectionError';
import {IHomeData, IMissionsProgress, INotiType} from '../../data';
import {queryKey} from '../../api/queryKey';
import {HomeBobpool} from '../../components/Home/HomeBobpool';
import {getHomeInfo, getNotificationsMain} from '../../api';
import {getMissionsProgress} from '../../api/mission';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

const Main = () => {
  const navigation = useNavigation();
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [allDone, setAllDone] = useState(false);
  const [newNotiCount, setNewNotiCount] = useState(0);
  const [swiperIndex, setSwiperIndex] = useState(1);

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

  useFocusEffect(
    useCallback(() => {
      homeData.refetch();
      notificationData.refetch();
    }, []),
  );

  const EventBanner = () => {
    return (
      <View
        style={{
          height: 150,
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 10,
        }}
      >
        <Swiper
          autoplayTimeout={5}
          autoplay={true}
          dot={<></>}
          activeDot={<></>}
          loadMinimal={true}
          onIndexChanged={(index) => setSwiperIndex(index + 1)}
        >
          <View>
            <Text style={[DesignSystem.title3SB, DesignSystem.grey17, {marginBottom: 8}]}>
              복정동에서 미션에 도전해보세요
            </Text>

            <FastImage
              source={require('../../assets/images/events/event_lauching.png')}
              style={{width: '100%', height: 100, borderRadius: 10}}
            />
          </View>
          <View>
            <Text style={[DesignSystem.title3SB, DesignSystem.grey17, {marginBottom: 8}]}>
              11월, 포인트 5배 적립!
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EventPage', {scroll: 550});
              }}
            >
              <FastImage
                source={require('../../assets/images/events/event_point.png')}
                style={{width: '100%', height: 100, borderRadius: 10}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[DesignSystem.title3SB, DesignSystem.grey17, {marginBottom: 8}]}>
              참여만 해도 100% 당첨
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EventPage', {scroll: 1500});
              }}
            >
              <FastImage
                source={require('../../assets/images/events/event_instagram.png')}
                style={{width: '100%', height: 100, borderRadius: 10}}
              />
            </TouchableOpacity>
          </View>
        </Swiper>
        <View
          style={{
            position: 'absolute',
            bottom: 25,
            right: 10,
            backgroundColor: '#000000',
            paddingHorizontal: 10,
            paddingVertical: 2,
            opacity: 0.7,
            borderRadius: 12,
          }}
        >
          <Text
            style={[
              {color: 'white', fontFamily: 'Pretendard-Medium', fontSize: 12, lineHeight: 16},
            ]}
          >
            {swiperIndex}/3
          </Text>
        </View>
      </View>
    );
  };

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
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      {homeData.isLoading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      ) : homeData.data?.missions === null ? (
        <>
          <AnimatedHeader
            animatedValue={offset}
            paddingTop={insets.top}
            data={homeData.data}
            newNotiCount={newNotiCount}
          />
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
            ListHeaderComponent={<View>{EventBanner()}</View>}
            ListFooterComponent={<HomeBobpool category={'NO'} />}
            onScroll={(event) => {
              Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
                useNativeDriver: false,
              })(event);
            }}
          />
        </>
      ) : (
        <>
          <AnimatedHeader
            animatedValue={offset}
            paddingTop={insets.top}
            data={homeData.data}
            newNotiCount={newNotiCount}
          />
          {allDone ? ( //미션 모두 완료한 경우
            <Animated.FlatList
              refreshControl={
                <RefreshControl
                  onRefresh={() => homeData.refetch()}
                  refreshing={homeData.isLoading}
                />
              }
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
                <View>
                  {EventBanner()}
                  <HomeMissionListHeader dday={homeData.data?.dday} allDone={allDone} />
                </View>
              }
              ListFooterComponent={<HomeBobpool category={'DONE'} />}
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
                  <View>
                    {EventBanner()}
                    <HomeMissionListHeader dday={homeData.data?.dday} allDone={allDone} />
                  </View>
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

    shadowColor: '#000C8A',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
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
