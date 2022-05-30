import React, {useRef} from 'react';
import {View, StyleSheet, Text, Animated, SafeAreaView} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Colors} from 'react-native-paper';
import {HomeMission} from '../../components';
import {AnimatedHeader} from '../../components';

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
  const offset = useRef(new Animated.Value(0)).current;
  const offsetNew = useRef(new Animated.Value(0)).current;
  return (
    <View style={[styles.mainView]}>
      <AnimatedHeader animatedValue={offset} animatedValue2={offsetNew} />
      <Animated.FlatList
        contentContainerStyle={{margin: 10, paddingTop: 250}}
        scrollEventThrottle={10}
        data={dummyMission}
        renderItem={({item}) => (
          <HomeMission
            name={item.name}
            category={item.category}
            day={item.day}
            minCost={item.minCost}
            point={item.point}
          />
        )}
        ListHeaderComponent={
          <Text style={{marginBottom: 10, fontSize: 18, fontWeight: '600'}}>My Mission</Text>
        }
        onScroll={(event) => {
          Animated.event([{nativeEvent: {contentOffset: {y: offset}}}], {
            useNativeDriver: false,
          })(event);

          Animated.event([{nativeEvent: {contentOffset: {y: offsetNew}}}], {
            useNativeDriver: false,
          })(event);
        }}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1},
});

export default Main;
