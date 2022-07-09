import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DesignSystem} from '../../assets/DesignSystem';

type HomeMissionListHeaderProps = {
  dday?: number;
};

export const HomeMissionListHeader = ({dday}: HomeMissionListHeaderProps) => {
  return (
    <View style={[styles.missionListHeaderWrap]}>
      <Text style={[DesignSystem.title3SB, DesignSystem.grey17]}>이번주 미션</Text>
      <View style={[styles.missionListBalloon]}>
        <Icon name="menu-left" size={32} style={[styles.headerIconStyle]} />
        <View style={[styles.flexRow]}>
          <Text style={[styles.ballonTextOne]}>{dday}일후에</Text>
          <Text style={[styles.ballonTextTwo]}> 사라져요!</Text>
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
  ballonTextOne: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  ballonTextTwo: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
  },
});
