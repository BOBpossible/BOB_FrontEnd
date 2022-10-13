import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

export const HomeFloatMessage = () => {
  return (
    <View style={[DesignSystem.centerArrange, styles.floatMessage]}>
      <View style={[styles.NEWBallon, DesignSystem.centerArrange]}>
        <Text style={[styles.ballonText]}>진행중인 미션이 있어요! </Text>
      </View>
      <Icon name="menu-down" size={24} style={[styles.headerIconStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  floatMessage: {width: '50%', left: '12.5%', position: 'absolute', bottom: -20, zIndex: 10},
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
});
