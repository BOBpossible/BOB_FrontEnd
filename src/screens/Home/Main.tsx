import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Platform, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeMissionCard} from '../../components/Home/HomeMissionCard';
import {AnimatedHeader, HomeMissionListHeader} from '../../components';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {customAxios} from '../../api/customAxios';
import {useQuery} from 'react-query';
import {AxiosError} from 'axios';
import {ConnectionError} from '../../components/ConnectionError';
import {IHomeData} from '../../data';
import {queryKey} from '../../api/queryKey';

const Main = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const getHomeInfo = async () => {
    const response = await customAxios().get('/api/v1/missions/me');
    return response.data.result;
  };
  const homeData = useQuery<IHomeData, AxiosError>(queryKey.HOMEDATA, getHomeInfo, {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  //밑에 주석된 코드는 mission.tsx에서 쓰면 user 정보를 캐싱하기에 나중에 옮길것!

  // const getUserInfo = async () => {
  //   const {data} = await customAxios(token).get('/api/v1/users/me');
  //   return data;
  // };

  // const {data, isSuccess, isError, error} = useQuery(['userInfo', token], getUserInfo);
  if (homeData.isError) {
    console.log('Home Error', homeData.error);
    return <ConnectionError refetch={homeData.refetch} />;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.flex}>
      {homeData.isFetching ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <AnimatedHeader animatedValue={offset} paddingTop={insets.top} data={homeData.data} />
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.missionListContainer]}
            scrollEventThrottle={10}
            data={homeData.data?.missions}
            renderItem={({item}) => (
              <HomeMissionCard
                missionId={item.missionId}
                name={item.storeName}
                category={item.storeCategory}
                mission={item.mission}
                point={item.point}
                status={false}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={<HomeMissionListHeader dday={homeData.data?.dday} />}
            onScroll={(event) => {
              Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
                useNativeDriver: false,
              })(event);
            }}
            ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
            ListFooterComponent={() => <View />}
            ListFooterComponentStyle={{marginTop: 40}}
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
  missionSeperate: {
    marginTop: 12,
  },
  flex: {
    flex: 1,
    backgroundColor: '#F6F6FA',
  },
});
