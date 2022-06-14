import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeMissionListHeader = () => {
  return (
    <View style={[styles.missionListHeaderWrap]}>
      <Text style={[styles.missionListHeaderText]}>새로운 밥미션</Text>

      <View style={[styles.missionListBalloon]}>
        <Icon name="menu-left" size={32} style={[styles.headerIconStyle]} />
        <View style={[styles.flexRow]}>
          <Text style={[styles.ballonText, styles.ballonTextPurple]}>7일후</Text>
          <Text style={[styles.ballonText, styles.ballonTextWhite]}> 미션이 사라져요!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  missionListHeaderWrap: {
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  missionListHeaderText: {
    fontSize: 18,
    fontWeight: '600',
  },
  missionListBalloon: {
    //말풍선
    backgroundColor: '#383838',
    height: 32,
    borderRadius: 10,
    marginLeft: 16,
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 16,
    paddingLeft: 13,
  },
  headerIconStyle: {
    position: 'absolute',
    color: '#383838',
    left: -18,
  },
  flexRow: {
    flexDirection: 'row',
  },
  ballonText: {
    fontSize: 13,
    lineHeight: 20,
  },
  ballonTextPurple: {fontWeight: '600', color: '#AAAAF9'},
  ballonTextWhite: {fontWeight: '400', color: '#FFFFFF'},
});
