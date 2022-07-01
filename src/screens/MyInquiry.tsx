import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyWriteInquiry} from '../components/MyWriteInquiry';
import {MyInquiryList} from '../components/MyInquiryList';

type Props = NativeStackScreenProps<MyStackParamList, 'MyInquiry'>;

export const MyInquiry = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [nowWrite, setNowWrite] = useState(true);
  return (
    <SafeAreaView style={[styles.flex, {backgroundColor: '#FFFFFF'}]}>
      <MyHeader goBack={goBack} title={'1:1 문의'} />
      <View style={[styles.menuView]}>
        <TouchableOpacity
          style={[styles.inquiryMenu, nowWrite && styles.now]}
          onPress={() => setNowWrite(true)}
        >
          <Text style={[nowWrite && styles.fontTitle4Md]}>문의하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inquiryMenu, !nowWrite && styles.now]}
          onPress={() => setNowWrite(false)}
        >
          <Text style={[!nowWrite && styles.fontTitle4Md]}>나의 문의 내역</Text>
        </TouchableOpacity>
      </View>
      {nowWrite ? <MyWriteInquiry /> : <MyInquiryList />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  fontTitle4Md: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#6C69FF',
  },
  menuView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F6F6F6',
  },
  now: {
    borderTopWidth: 3,
    borderTopColor: '#6C69FF',
    backgroundColor: '#FFFFFF',
  },
  inquiryMenu: {
    width: '50%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  myInquiryList: {

  },
});
