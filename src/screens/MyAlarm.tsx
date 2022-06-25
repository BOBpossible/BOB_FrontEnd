import React, {useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';
import {MyAlarmSwitch} from '../components/MyAlarmSwitch';

type Props = NativeStackScreenProps<MyStackParamList, 'MyAlarm'>;

export const MyAlarm = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [onNewevent, setOnNewevent] = useState(false);
  const [onReview, setOnReview] = useState(false);
  const [onInquiry, setOnInquiry] = useState(false);
  console.log(onNewevent, onReview, onInquiry);

  return (
    <View style={[styles.flex]}>
      <MyHeader goBack={goBack} title={'알람설정'} />
      <View style={[styles.eachAlarm]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'새로운 이벤트'}</Text>
        <Switch
          value={onNewevent}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onNewevent ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnNewevent(!onNewevent)}
          style={{marginRight: 16}}
        />
      </View>
      <View style={[styles.eachAlarm]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'리뷰 답변'}</Text>
        <Switch
          value={onReview}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onReview ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnReview(!onReview)}
          style={{marginRight: 16}}
        />
      </View>
      <View style={[styles.eachAlarm]}>
        <Text style={{marginLeft: 21.87, color: '#000000', fontSize: 16}}>{'문의 내역 답변'}</Text>
        <Switch
          value={onInquiry}
          trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
          thumbColor={onInquiry ? '#FFFFFF' : '#FFFFFF'}
          onValueChange={() => setOnInquiry(!onInquiry)}
          style={{marginRight: 16}}
        />
      </View>
      {/* <MyAlarmSwitch
          text={'새로운 이벤트'}
          value={onNewevent}
          onValueChange={() => setOnNewevent(!onNewevent)}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  alarmWrap: {
    height: 68,
    backgroundColor: 'white',
  },
  reply: {
    height: 68,
    backgroundColor: 'white',
  },
  inquiry: {
    height: 68,
    backgroundColor: 'white',
  },
  eachAlarm: {
    height: 68,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
