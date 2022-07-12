import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Switch, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import {queryKey} from '../../api/queryKey';
import {useMutation, useQuery} from 'react-query';
import {getNotifications, patchNotifications} from '../../api/my';
type Props = NativeStackScreenProps<MyStackParamList, 'MyNotificationsSetting'>;

export const MyNotificationsSetting = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [onNewevent, setOnNewevent] = useState(true);
  const [onReview, setOnReview] = useState(true);
  const [onInquiry, setOnInquiry] = useState(true);
  // console.log(onNewevent, onReview, onInquiry);

  const DataNotifications = useQuery(queryKey.NOTIFICATIONS, getNotifications);
  useEffect(() => {
    if (DataNotifications.data !== undefined) {
      setOnNewevent(DataNotifications.data.event);
      setOnReview(DataNotifications.data.review);
      setOnInquiry(DataNotifications.data.question);
    }
  }, [DataNotifications.data]);

  const notificationsMutation = useMutation(
    (data: {event: boolean; review: boolean; question: boolean}) => patchNotifications(data),
    {
      onSuccess(data) {
        console.log('알림설정 patch 성공', data);
      },
    },
  );
  const submitReview = async () => {
    await notificationsMutation.mutate({
      event: onNewevent,
      review: onReview,
      question: onInquiry,
    });
  };
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <MyHeader
          goBack={() => {
            goBack();
            submitReview();
          }}
          title={'알림 설정'}
        />
        {DataNotifications.data !== undefined && (
          <>
            <View style={[styles.eachNotifications]}>
              <Text style={[DesignSystem.body1Lt, {marginLeft: 21.87, color: '#000000'}]}>
                새로운 이벤트
              </Text>
              <Switch
                value={onNewevent}
                trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
                thumbColor={onNewevent ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={() => setOnNewevent(!onNewevent)}
                style={{marginRight: 16}}
              />
            </View>
            <View style={[styles.eachNotifications]}>
              <Text style={[DesignSystem.body1Lt, {marginLeft: 21.87, color: '#000000'}]}>
                리뷰 답변
              </Text>
              <Switch
                value={onReview}
                trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
                thumbColor={onReview ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={() => setOnReview(!onReview)}
                style={{marginRight: 16}}
              />
            </View>
            <View style={[styles.eachNotifications]}>
              <Text style={[DesignSystem.body1Lt, {marginLeft: 21.87, color: '#000000'}]}>
                문의 내역 답변
              </Text>
              <Switch
                value={onInquiry}
                trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
                thumbColor={onInquiry ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={() => setOnInquiry(!onInquiry)}
                style={{marginRight: 16}}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  eachNotifications: {
    height: hp(calHeight(68)),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
