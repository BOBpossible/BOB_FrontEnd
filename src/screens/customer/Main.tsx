import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Colors} from 'react-native-paper';
import HomeMission from '../../components/HomeMission';

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
];

const Main = () => {
  return (
    <View style={[styles.mainView]}>
      <Text>애니메이션 헤더</Text>
      <FlatList
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
        ListHeaderComponent={<Text>My Mission</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1, margin: 10},
});

export default Main;
