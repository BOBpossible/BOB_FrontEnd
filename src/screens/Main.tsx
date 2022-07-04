import React, {useRef} from 'react';
import {View, StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeMissionCard} from '../components/HomeMissionCard';
import {AnimatedHeader, HomeMissionListHeader} from '../components';
import {useRecoilState} from 'recoil';
import {userToken} from '../state';
import {useNavigation} from '@react-navigation/native';

const dummyMission = [
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
  },
  {
    name: '반이학생마라탕',
    category: '중식당',
    day: 7,
    minCost: 10000,
    point: 500,
  },
];

const Main = () => {
  const navigation = useNavigation();
  const [token, setToken] = useRecoilState(userToken);
  console.log(token);
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']}>
      <AnimatedHeader animatedValue={offset} paddingTop={insets.top} />
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.missionListContainer]}
        scrollEventThrottle={10}
        data={dummyMission}
        renderItem={({item}) => (
          <HomeMissionCard
            name={item.name}
            category={item.category}
            day={item.day}
            minCost={item.minCost}
            point={item.point}
            status="start"
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
      />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  missionListContainer: {
    paddingTop: 240,
    paddingBottom: 10,
    backgroundColor: '#F6F6FA',
  },
  missionSeperate: {
    margin: 16,
  },
});
