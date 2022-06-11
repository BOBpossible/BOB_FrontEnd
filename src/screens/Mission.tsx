import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MissionCard} from '../components';

const Mission = () => {
  return (
    <SafeAreaView style={[styles.flex, styles.headerWrap]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerText]}>MISSION</Text>
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
  header: {backgroundColor: '#615EFF'},
  headerText: {fontSize: 20},
  headerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default Mission;
