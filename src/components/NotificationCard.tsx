import React, {useState} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DesignSystem} from '../assets/DesignSystem';
import ReviewModal from '../modal/ReviewModal';
import {useNavigation} from '@react-navigation/native';
import {getNotifications, patchNotificationsStatus} from '../api';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {INotiType} from '../data';
import {queryKey} from '../api/queryKey';
import {useSetRecoilState} from 'recoil';
import {missionPage} from '../state';

export type NotificationCardProps = {
  navigation: any;
  pushType: string; //미션알림1인지 리뷰남기란 알림0인지
  name: string;
  subId: number;
  title: string;
  subTitle: string;
  date: string;
  checked: boolean;
  id: number;
};

export const NotificationCard: FC<NotificationCardProps> = ({
  id,
  pushType,
  name,
  title,
  subTitle,
  subId,
  date,
  checked,
  navigation,
}) => {
  const setProgress = useSetRecoilState(missionPage);
  const queryClient = useQueryClient();
  const missionSuccessRequestMutation = useMutation(
    (notiId: number) => patchNotificationsStatus(notiId),
    {
      onSuccess: (data) => {
        console.log('알림확인 전환 성공: ', data);
        queryClient.invalidateQueries('notifications');
      },
      onError: (err) => {
        console.log('알림확인 전환 실패: ', err);
      },
    },
  );
  return (
    <>
      {pushType === 'MISSION' ? (
        <TouchableOpacity
          style={[checked ? styles.notiCardChecked : styles.notiCardNew]}
          onPress={() => {
            navigation.navigate('HomeMissionDetails', {missionId: subId});
            missionSuccessRequestMutation.mutate(id);
          }}
        >
          <View style={[styles.notiWrap]}>
            <View style={!checked ? [styles.dot] : [styles.noDot]} />
            <View style={[styles.notiView]}>
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>
                {title}
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}>
                <Text style={[DesignSystem.purple5]}>{name}</Text>
                {subTitle}
              </Text>
              <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
                {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11, 15)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : pushType === 'REVIEW' ? (
        <TouchableOpacity
          style={[checked ? styles.notiCardChecked : styles.notiCardNew]}
          onPress={() => {
            missionSuccessRequestMutation.mutate(id);
            setProgress(false);
            navigation.pop();
            navigation.navigate('MissionNavigator');
          }}
        >
          <View style={[styles.notiWrap]}>
            <View style={!checked ? [styles.dot] : [styles.noDot]} />
            <View style={[styles.notiView]}>
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>
                {title}
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}>
                <Text style={[DesignSystem.purple5]}>{name} </Text>
                {subTitle}
              </Text>
              <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
                {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11, 16)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : pushType === 'ANSWER' ? (
        <TouchableOpacity
          style={[checked ? styles.notiCardChecked : styles.notiCardNew]}
          onPress={() => {
            navigation.pop();
            navigation.navigate('MyNavigator', {screen: 'MyInquiry'});
          }}
        >
          <View style={[styles.notiWrap]}>
            <View style={!checked ? [styles.dot] : [styles.noDot]} />
            <View style={[styles.notiView]}>
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>
                {title}
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}>
                <Text style={[DesignSystem.purple5]}>{name} </Text>
                {subTitle}
              </Text>
              <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
                {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11, 16)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[checked ? styles.notiCardChecked : styles.notiCardNew]}
          onPress={() => {
            missionSuccessRequestMutation.mutate(id);
            setProgress(true);
            navigation.pop();
            navigation.navigate('MissionNavigator');
          }}
        >
          <View style={[styles.notiWrap]}>
            <View style={!checked ? [styles.dot] : [styles.noDot]} />
            <View style={[styles.notiView]}>
              <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom: 4}]}>
                {title}
              </Text>
              <Text style={[DesignSystem.body1Lt, DesignSystem.grey10, {marginBottom: 8}]}>
                <Text style={[DesignSystem.purple5]}>{name} </Text>
                {subTitle}
              </Text>
              <Text style={[DesignSystem.caption1Lt, {color: '#7D7D7D'}]}>
                {date.slice(0, 4)}.{date.slice(5, 7)}.{date.slice(8, 10)} {date.slice(11, 16)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  notiCardNew: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    opacity: 1,
  },
  notiCardChecked: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    opacity: 0.5,
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
