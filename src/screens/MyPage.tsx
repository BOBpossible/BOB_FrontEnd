import React, {useState, useCallback} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyUser} from '../components/My/MyUser';
import {useNavigation} from '@react-navigation/native';

const MyPage = () => {
  const navigation = useNavigation();

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('userToken', value);
    } catch (e) {
      console.log(e);
    }
  };
  const logout = () => {
    storeData('');
  };
  console.log(AsyncStorage.getItem('userToken'));

  // 서버연결 후 수정
  const name = '밥풀이';
  const email = 'bobPlace@bob.com';
  const point = 2500;
  const [authentication, setAuthentication] = useState<boolean>(false);
  //

  return (
    <View style={[styles.flex]}>
      <View style={[styles.headerWrap]}>
        <View style={[styles.header]}>
          <Text style={[styles.headerText]}>마이페이지</Text>
        </View>
      </View>
      <MyUser authentication={authentication} email={email} name={name} point={point} />
      <TouchableOpacity onPress={() => navigation.navigate('MyReview')}>
        <View style={[styles.userWrap]} >
          <Text style={[styles.userMenu]}>리뷰 관리</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyNotificationsSetting')}>
        <View style={[styles.userWrap]} >
          <Text style={[styles.userMenu]}>알림 설정</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyInquiry')}>
        <View style={[styles.userWrap]} >
          <Text style={[styles.userMenu]}>1:1 문의</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <View style={[styles.userWrap]} >
          <Text style={[styles.userMenu]}>로그아웃</Text>
        </View>
      </TouchableOpacity>
    </View>
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
    fontSize: 17,
    color: 'black',
    marginLeft: 16,
    marginRight: 16,
    fontWeight: '600',
  },
  userWrap: {
    width: '100%',
    height: 68,
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
    justifyContent: 'center',
  },
  userMenu: {
    marginLeft: 22,
    fontSize: 16,
    color: '#111111',
  },
});

export default MyPage;
