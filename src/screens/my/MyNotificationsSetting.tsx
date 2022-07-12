import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import {MyHeader} from '../../components/My/MyHeader';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
type Props = NativeStackScreenProps<MyStackParamList, 'MyNotificationsSetting'>;

export const MyNotificationsSetting = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [onNewevent, setOnNewevent] = useState(true);
  const [onReview, setOnReview] = useState(true);
  const [onInquiry, setOnInquiry] = useState(true);
  console.log(onNewevent, onReview, onInquiry);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <MyHeader goBack={goBack} title={'알림 설정'} />
        <View style={[styles.eachNotifications]}>
          <Text style={[DesignSystem.body1Lt, {marginLeft: 21.87, color: '#000000'}]}>새로운 이벤트</Text>
          <Switch
            value={onNewevent}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onNewevent ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnNewevent(!onNewevent)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[DesignSystem.body1Lt, {marginLeft: 21.87, color: '#000000'}]}>리뷰 답변</Text>
          <Switch
            value={onReview}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onReview ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnReview(!onReview)}
            style={{marginRight: 16}}
          />
        </View>
        <View style={[styles.eachNotifications]}>
          <Text style={[DesignSystem.body1Lt, {marginLeft: 21.87, color: '#000000'}]}>문의 내역 답변</Text>
          <Switch
            value={onInquiry}
            trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
            thumbColor={onInquiry ? '#FFFFFF' : '#FFFFFF'}
            onValueChange={() => setOnInquiry(!onInquiry)}
            style={{marginRight: 16}}
          />
        </View>
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
