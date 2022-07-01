import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export type NotificationCardProps = {
  isNewMission: boolean; //미션알림1인지 리뷰남기란 알림0인지
  storeName?: string;
  storeId?: number;
  mission: string; //미션
  date?: string; //날짜. 이거 어느형식으로 받으려나
  status?: number; //활성화1, 비활성화0
};

//prettier-ignore
export const NotificationCard: FC<NotificationCardProps> = ({isNewMission, storeName, storeId, mission, date, status }) => {
  const navigation = useNavigation();

  return (
    <>
    {isNewMission === true ?
      <TouchableOpacity style={[styles.notiCard, status === 0 && {opacity: 0.5 }]}>
        <View style={[styles.notiWrap]}>
          <View style={status ===1 ? [styles.dot] : [styles.noDot]}>
          </View>
          <View style={[styles.notiView]}>
            <Text style={[styles.message]}>새로운 미션이 도착했습니다.</Text>
            <Text style={[styles.mission]}><Text style={{color: '#6C69FF'}}>{storeName}</Text>에서 {mission}의 식사를 하세요!</Text>
            <Text style={[styles.date]}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      <TouchableOpacity style={[styles.notiCard, status === 0 && {opacity: 0.5 }]}>
        <View style={[styles.notiWrap]}>
          <View style={status ===1 ? [styles.dot] : [styles.noDot]}>
          </View>
          <View style={[styles.notiView]}>
            <Text style={[styles.message]}>리뷰를 남겨주세요.</Text>
            <Text style={[styles.mission]}><Text style={{color: '#6C69FF'}}>{storeName}</Text>의 음식이 맛있었다면 리뷰를 남겨주세요.</Text>
            <Text style={[styles.date]}>{date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    }
    </>
  );
};

const styles = StyleSheet.create({
  notiCard: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  notiWrap: {
    //구성요소들 정렬
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 25,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: '#6C69FF',
    marginTop: 9,
    marginRight: 9,
  },
  noDot: {
    width: 6,
    marginRight: 9,
  },
  notiView: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
    fontFamily: 'Pretendard-Regular',
  },
  mission: {
    fontSize: 16,
    marginBottom: 8,
    color: '#111111',
    fontFamily: 'Pretendard-Light',
  },
  date: {
    fontSize: 12,
    color: '#7D7D7D',
    fontFamily: 'Pretendard-Light',
  },
});
