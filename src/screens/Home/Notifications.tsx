import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../nav/HomeNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {NotificationCard} from '../../components/NotificationCard';
import {getNotifications, patchNotificationsStatus} from '../../api';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {INotiType} from '../../data';
import {queryKey} from '../../api/queryKey';
import {DesignSystem} from '../../assets/DesignSystem';

type Props = NativeStackScreenProps<HomeStackParamList, 'Notifications'>;

export const Notifications = ({navigation}: Props) => {
  const queryClient = useQueryClient();

  const DataNoti = useQuery<INotiType[]>(queryKey.NOTIFICATIONS, getNotifications, {
    onError: (err) => {
      console.log('ERR', err);
    },
    onSuccess: (data) => {
      console.log('DataNoti', data);
    },
  });
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
  const checkedNoti = (notiId: number) => {
    missionSuccessRequestMutation.mutate(notiId);
  };
  console.log('DATANOTI', DataNoti.data); //스웨거에서result인 배열
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex]}>
        <MyHeader goBack={goBack} title={'알림'} />
        {DataNoti.data?.length !== 0 ? (
          <FlatList
            style={{marginLeft: 16, marginRight: 16}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60, marginTop: 12}}
            scrollEventThrottle={10}
            data={DataNoti.data}
            renderItem={({item}) => (
              <NotificationCard
                pushType={item.pushType}
                storeName={item.storeName}
                storeId={item.storeId}
                missionId={item.missionId}
                mission={item.subTitle}
                date={item.date}
                checked={item.checked}
                id={item.id}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginTop: 8}} />}
          />
        ) : (
          <View style={[DesignSystem.centerArrange, {marginTop: 100, marginBottom: 50}]}>
            <Text style={[DesignSystem.title1SB, {color: '#111111', marginBottom: 38}]}>
              아직 받은 알람이 없어요!
            </Text>

            <Image source={require('../../assets/images/bobpool/cryingBobBowl.png')} />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: '#F8F8F8'},
  flexTop: {},
});
