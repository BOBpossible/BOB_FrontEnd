import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
const Mission = () => {
  return (
    <SafeAreaView style={[styles.flex, styles.headerWrap]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerText]}>미션</Text>
      </View>
      <MissionCard
        name={'가게이름'}
        category={'카테고리'}
        day={7}
        minCost={10}
        point={10}
        status="request"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  header: {
    marginLeft: 16,
    marginRight: 16,
    height: 41,
  },
  headerWrap: {
    position: 'absolute',
    width: '100%',
  },
  headerText: {fontSize: 17, color: 'black'},
});

export default Mission;
