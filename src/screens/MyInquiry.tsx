import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyWriteInquiry} from '../components/My/MyWriteInquiry';
import {MyInquiryList} from '../components/My/MyInquiryList';
import {DesignSystem} from '../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../assets/CalculateLength';

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
          <Text
            style={
              nowWrite
                ? [DesignSystem.title4Md, DesignSystem.grey17]
                : [DesignSystem.body1Lt, DesignSystem.grey8]
            }
          >
            문의하기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inquiryMenu, !nowWrite && styles.now]}
          onPress={() => setNowWrite(false)}
        >
          <Text
            style={
              !nowWrite
                ? [DesignSystem.title4Md, DesignSystem.grey17]
                : [DesignSystem.body1Lt, DesignSystem.grey8]
            }
          >
            나의 문의 내역
          </Text>
        </TouchableOpacity>
      </View>
      {nowWrite ? <MyWriteInquiry /> : <MyInquiryList setNowWrite={setNowWrite} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  menuView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: hp(calHeight(50)),
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
    backgroundColor: '#F6F6F6',
  },
});
