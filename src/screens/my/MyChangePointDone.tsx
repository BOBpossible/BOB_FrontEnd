import React from 'react';
//prettier-ignore
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../../nav/MyNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<MyStackParamList, 'MyChangePointDone'>;
export const MyChangePointDone = ({navigation, route}: Props) => {
  const goMain = () => {
    navigation.navigate('MyPage');
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={[styles.flex, {backgroundColor: 'white'}]}>
      <View style={[styles.totalWrap]}>
        <View style={[styles.contentWrap]}>
          <Icon name="check" size={71} color="#6C69FF" />
          <Text style={[styles.title4Md, {marginTop: 46, marginBottom: 6}]}>입금 신청이 완료되었습니다.</Text>
          <Text style={[styles.body2Lt]}>입금은 심사 후 매주 수요일에 일괄 송금됩니다.</Text>
        </View>
        <TouchableOpacity onPress={goMain} style={[styles.buttonWrap]}>
          <View style={[styles.buttonStyle, styles.activeButton]}>
            <Text style={[styles.activeButtonText]}>홈으로 돌아가기</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  title4Md: {
    color: '#111111',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  body2Lt: {
    color: '#616161',
    fontSize: 14,
    fontFamily: 'Pretendard-Light',
  },
  caption1Light: {
    fontSize: 12,
    fontFamily: 'Pretendard-Light',
  },
  totalWrap: {
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  contentWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrap: {justifyContent: 'center', alignItems: 'center', marginBottom: 20},
  buttonStyle: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activeButton: {backgroundColor: '#6C69FF'},
  activeButtonText: {
    fontSize: 18,
    fontFamily: 'Pretendard-Medium',
    color: '#FFFFFF',
  },
});
