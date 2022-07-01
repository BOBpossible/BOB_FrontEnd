import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export type MyPointListProps = {
  date?: string; //?????????
  storeId?: number;
  storeName: string;
  mission: string;
  status?: number; //+인지 포인트전환- 인지해야할듯
  point: number;
};

//prettier-ignore
export const MyPointList: FC<MyPointListProps> = ({date, storeId, storeName, mission, point }) => {
  return (
    <View style={[styles.listWrap]}>
        <View style={[styles.listDayWrap]}>
            <Text style={[styles.dateText, styles.title33B16]}>{date}</Text>
        </View>
        <View style={[styles.listDetailsWrap]}>
            <View style={[styles.listMissionWrap]}>
                <Text style={[styles.storeNameText, styles.title33B16]}>{storeName}</Text>
                <Text style={[styles.missionText]}>{mission}</Text>
            </View>
            <View style={[styles.listPointWrap]}>
                <Text style={[styles.pointText, styles.title33B16]}>+{point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P</Text>
            </View>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title33B16: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
  },
  listWrap: {
    flexDirection: 'row',
  },
  listDayWrap: {
    marginRight: 26,
    width: 34,
  },
  dateText: {
    color: '#2A2A2A',
  },
  listDetailsWrap: {
    flex: 1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listMissionWrap: {

  },
  storeNameText: {
    color: '#3F3F3F',
  },
  missionText: {
    color: '#949494',
    fontSize: 16,
    fontFamily: 'Pretendard-Light',
  },
  listPointWrap: {

  },
  pointText: {
    color: '#6C69FF',
  },
});
