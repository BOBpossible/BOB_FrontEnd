import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight, calWidth} from '../assets/CalculateLength';
import {DesignSystem} from '../assets/DesignSystem';

export type MissionProcessProps = {
  status?: string; //NEW, PROGRESS, OWNER_CHECK
};

export const MissionProcess: FC<MissionProcessProps> = ({status}) => {
  const nowOnProgress = () => {
    return (
      <>
        <View style={{width:14, height:14}}>
          <View style={[styles.activeCircleBack, {position: 'relative', right: 4, bottom: 4}]} />
          <View style={[styles.activeCircle, {position: 'relative', bottom: 22, zIndex: 1}]} />
        </View>
        <View style={[styles.processLine]} />
        <View style={[styles.activeCircle, {backgroundColor: '#C8C8C8'}]} />
      </>
    );
  };
  const nowOnSuccess = () => {
    return (
      <>
        <View style={[styles.inactiveCircle]} />
        <View style={[styles.processLine]} />
        <View style={{width:14, height:14}}>
          <View style={[styles.activeCircleBack, {position: 'relative', right: 4, bottom: 4}]} />
          <View style={[styles.activeCircle, {position: 'relative', bottom: 22, zIndex: 1}]} />
        </View>
      </>
    );
  };
  //prettier-ignore
  return (
    <View style={[styles.processWrap]}>
      <View style={[styles.processTextRow]}>
        <Text style={[DesignSystem.caption1Lt, {color: '#949494'}]}>미션 도전</Text>
        <Text style={[DesignSystem.caption1Lt, {color: status === 'NEW' || status === 'PROGRESS' ? '#111111' : '#949494'}]}>진행중</Text>
        <Text style={[DesignSystem.caption1Lt, {color: status === 'NEW' || status === 'PROGRESS' ? '#949494' : '#111111'}]}>도전 성공</Text>
      </View>
      <View style={[styles.processCircleRow]}>
        <View style={[styles.inactiveCircle]} />
        <View style={[styles.processLine]} />
        {status === 'OWNER_CHECK' ? nowOnSuccess() : nowOnProgress()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  processWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    marginBottom: 14,
  },
  processTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
    width: wp(calWidth(212)),
    marginLeft: wp(calWidth(80)),
    marginRight: wp(calWidth(80)),
  },
  processCircleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircleBack: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#AAAAF9',
    opacity: 0.5,
  },
  inactiveCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#C8C8C8',
  },
  activeCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6C69FF',
    zIndex: -1,
  },
  processLine: {
    height: 1,
    width: 72,
    backgroundColor: '#C8C8C8',
    zIndex: -1,
  },
});
