import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export type MyUserProps = {
  userprofile?: any; //?????????
  username: string;
  userid?: number; //email로 바꼈나?
  userEmail: string;
  point: number;
  status: string; //"identified","unidentified"
};

//prettier-ignore
export const MyUser: FC<MyUserProps> = ({username, userEmail, point, status }) => {
  const [statusMessage, setMessage] = useState("");
  useEffect(()=>{
    if (status === 'unidentified') {setMessage('미인증')}
    else if (status === 'unidentified') {setMessage('')}
  }, [status]);
  const navigation = useNavigation();

  return (
    <View style={[styles.userInfo]}>
      <View style={[styles.userCard]}>
        <View style={[styles.profileWrap]}>
          <Image
            style={[styles.profileImg]}
            source={require('../assets/images/tmpUserImage.png')} //
          />
        </View>
        <View style={[styles.userWrap]}>
          <View style={[styles.username]}>
            <Text style={[styles.usernameText]}>{username}</Text>
            <Text style={[styles.userauthText]}>{statusMessage}</Text>
          </View>
          <Text style={[styles.userEmail]}>{userEmail}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('MyEditUserInfo')}>
          <View style={[styles.editUserInfo]}>
            <Text style={{color: '#6C69FF', fontSize: 12}}>회원정보 수정</Text>
            <Image
              style={[styles.MyNextImg]}
              source={require('../assets/images/arrowGrey8.png')} //
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.userPoint]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 20, color: '#616161', fontSize: 14}}>내 포인트</Text>
          <Text style={{marginLeft: 16, color: '#111111', fontSize: 14}}>{point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
        <Image
            style={[styles.MyNextImg]}
            source={require('../assets/images/arrowGrey10.png')} //
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    height: 148,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 18,
  },
  profileWrap: {
    marginLeft: 16,
    marginRight: 16,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // marginBottom: 8,
  },
  userWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  username: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameText: {
    color: '#111111',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  userauthText: {
    fontSize: 12,
    color: '#E03D32',
  },
  userEmail: {
    fontSize: 12,
    color: '#616161',
  },
  statusWrap: {
    marginRight: 24,
    justifyContent: 'center',
  },
  statusText: {
    color: '#111111',
    fontSize: 16,
  },
  editUserInfo: {
    flexDirection: 'row',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPoint: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#F6F6FE',
    borderRadius: 10,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MyNextImg: {
    marginRight: 20,
  },
});
