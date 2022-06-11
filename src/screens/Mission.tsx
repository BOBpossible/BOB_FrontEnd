import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';
const Mission = () => {
  function missionRequest() {console.log('missionRequest');}
  function missionOnRequest() {console.log('missionOnRequest');}
  function missionSuccess() {console.log('missionSuccess');}
  function missionReview() {console.log('missionReview');}
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
        handleOnPress={missionRequest}
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
