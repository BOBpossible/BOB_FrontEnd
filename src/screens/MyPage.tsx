import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyUser} from '../components/MyUser';

const MyPage = () => {
  const [status, setStatus] = useState<string>('request'); //버튼문구 //"start","request","onrequest","success", "review"//

  const title = 'MyPage';
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
  return (
    <View style={[styles.flex]}>
      <View style={[styles.headerWrap]}>
        <View style={[styles.header]}>
          <Text style={[styles.headerText]}>마이페이지</Text>
        </View>
      </View>
      <MyUser username={'춘식이'} userid={123} status={status} />
      <View style={[styles.userWrap]}>
        <Text>냐</Text>
      </View>
      <Text>{title}</Text>
      <TouchableOpacity onPress={logout}>
        <View style={{height: 200, width: 200, borderWidth: 1}}>
          <Text>로그아웃</Text>
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
    marginBottom: 8,
  },
  header: {
    height: 40,
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
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
  },
});

export default MyPage;
