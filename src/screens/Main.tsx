import React, {useRef} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
import {AnimatedHeader} from '../components';
import {useRecoilState} from 'recoil';
import {userToken} from '../state';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const [token, setToken] = useRecoilState(userToken);
  console.log(token);
  const offset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  console.log('inset?', insets);

  return (
    <SafeAreaView edges={['top']}>
      <AnimatedHeader animatedValue={offset} paddingTop={insets.top} />
      <Animated.FlatList
        contentContainerStyle={{paddingTop: 239, paddingBottom: 10}}
        scrollEventThrottle={10}
        data={dummyMission}
        renderItem={({item}) => (
          <MissionCard
            name={item.name}
            category={item.category}
            day={item.day}
            minCost={item.minCost}
            point={item.point}
            status="start"
          />
        )}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{fontSize: 18, fontWeight: '600'}}>새로운 밥미션</Text>

            <View style={{backgroundColor: '#383838', width: 140, height: }}>
              <Icon name="menu-left" size={30} style={{position: 'absolute'}} />
              <Text style={{fontSize: 13}}>며칠 후 사라져요</Text>
            </View>
          </View>
        }
        onScroll={(event) => {
          Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
            useNativeDriver: false,
          })(event);
        }}
        ItemSeparatorComponent={() => <View style={{margin: 16}} />}
      />
    </SafeAreaView>
  );
};

export default Main;
