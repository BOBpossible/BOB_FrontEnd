import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeMissionCard} from '../components/Home/HomeMissionCard';
import {AnimatedHeader, HomeMissionListHeader} from '../components';
import {useRecoilValue} from 'recoil';
import {userToken} from '../state';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {calWidth, calHeight} from '../assets/CalculateLength';

const dummyMission = [
  {
    missionId: 0,
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: '10000원 이상',
    point: 500,
  },
  {
    missionId: 1,
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: '대표메뉴 마라탕',
    point: 500,
  },
  {
    missionId: 2,
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: '10000원 이상',
    point: 500,
  },
];

const Main = () => {
  const token = useRecoilValue(userToken);
  console.log(token);
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.flex}>
      <AnimatedHeader animatedValue={offset} paddingTop={insets.top} />
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.missionListContainer]}
        scrollEventThrottle={10}
        data={dummyMission}
        renderItem={({item}) => (
          <HomeMissionCard
            missionId={item.missionId}
            name={item.name}
            category={item.category}
            mission={item.minCost}
            point={item.point}
            status={false}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HomeMissionListHeader />}
        onScroll={(event) => {
          Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
            useNativeDriver: false,
          })(event);
        }}
        ItemSeparatorComponent={() => <View style={[styles.missionSeperate]} />}
        ListFooterComponent={() => <View />}
        ListFooterComponentStyle={{marginTop: 40}}
      />
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
