import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyUser} from '../../components/My/MyUser';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DesignSystem} from '../../assets/DesignSystem';
import {calHeight} from '../../assets/CalculateLength';
import {useQuery} from 'react-query';
import {IgetUsersMe} from '../../data';
import {queryKey} from '../../api/queryKey';
import {getUserInfo} from '../../api';
import {ConnectionError} from '../../components/ConnectionError';

const MyPage = () => {
  const navigation = useNavigation();
  const {data, isError, refetch} = useQuery<IgetUsersMe>(queryKey.USERINFO, getUserInfo);
  // data.point 로 접근
  const logout = async () => {
    await AsyncStorage.multiSet([
      ['accessToken', ''],
      ['refreshToken', ''],
    ]);
    navigation.navigate('AuthNavigator');
  };
  console.log('async userToken', AsyncStorage.getItem('userToken'));

  if (isError) {
    return <ConnectionError refetch={refetch} />;
  }
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#FFFFFF'}} />
      <SafeAreaView style={[styles.flex, {backgroundColor: '#F8F8F8'}]}>
        <View style={[styles.headerWrap]}>
          <View style={[styles.header]}>
            <Text style={[styles.headerText, DesignSystem.h2SB]}>마이페이지</Text>
          </View>
        </View>
        {data !== undefined && (
          <MyUser
            authentication={data.authentication}
            email={data.email}
            name={data.name}
            point={data.point}
          />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('MyReview')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, {color: '#111111', marginLeft: 22}]}>
              리뷰 관리
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyNotificationsSetting')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, {color: '#111111', marginLeft: 22}]}>
              알림 설정
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyInquiry')}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, {color: '#111111', marginLeft: 22}]}>1:1 문의</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={[styles.myMenuWrap]}>
            <Text style={[DesignSystem.body1Lt, {color: '#111111', marginLeft: 22}]}>로그아웃</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('탈퇴')} style={{alignItems: 'flex-end'}}>
          <Text style={[styles.quitText]}>계정탈퇴</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  headerWrap: {
    width: '100%',
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
  header: {
    height: 41,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  headerText: {
    color: 'black',
    marginLeft: 16,
    marginRight: 16,
  },
  myMenuWrap: {
    width: '100%',
    height: hp(calHeight(68)),
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    justifyContent: 'center',
  },
  quitText: {
    color: '#777777',
    fontSize: 14,
    marginRight: 16,
    marginTop: 8,
  },
});

export default MyPage;
