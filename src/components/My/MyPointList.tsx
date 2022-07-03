import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
import {DesignSystem} from '../../assets/DesignSystem';

//prettier-ignore
export const MyPointList = () => {
  // 서버연결 후 수정
  const date = '2022-12-03T16:01:34.864Z';
  const point = -500;
  const title = '밥플레이스';
  const subTitle = '20000원 이상 식사';
  //
  const formatDate = new moment(date.slice(0,10), 'YYYY-MM-DD').format('YYMMDD');
  const month = formatDate.slice(2,3) === '0' ? formatDate.slice(3,4) : formatDate.slice(2,4);
  const day = formatDate.slice(4,5) === '0' ? formatDate.slice(5,6) : formatDate.slice(4,6);

  return (
    <View style={[styles.listWrap]}>
        <View style={[styles.listDayWrap]}>
            <Text style={[styles.dateText, DesignSystem.title3SB]}>{month}.{day}</Text>
        </View>
        <View style={[styles.listDetailsWrap]}>
            <View style={[styles.listMissionWrap]}>
                <Text style={[styles.storeNameText, DesignSystem.title3SB]}>{title}</Text>
                <Text style={[styles.missionText], {fontFamily: 'Pretendard-Light'}}>{subTitle}</Text>
                {/* <Text style={[styles.missionText], {point > 0 ? fontFamily: 'Pretendard-Light' : fontFamily: 'Pretendard-Light' }}>{subTitle}</Text> */}
            </View>
            <View style={[styles.listPointWrap]}>
                {point > 0 ?
                <Text style={[DesignSystem.title3SB, {color: '#6C69FF'}]}>{point.toString().replace(/\B(?=(\d{3})(?!\d))/g, ',')}P</Text>
                :
                <Text style={[DesignSystem.title3SB, {color: '#B7B7B7'}]}>{point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}P</Text>
                }
            </View>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listWrap: {
    flexDirection: 'row',
  },
  listDayWrap: {
    marginRight: 16,
    width: 44,
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
