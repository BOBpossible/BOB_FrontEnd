import React, {useState, useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyUserProps = {
  authentication: boolean;
  email: string;
  name: string;
  point: number;
};

//prettier-ignore
export const MyUser: FC<MyUserProps> = ({authentication, email, name, point }) => {
  const [statusMessage, setMessage] = useState('');
  useEffect(()=>{
    if (!authentication) {setMessage('미인증')}
    else {setMessage('')}
  }, [authentication]);
  const navigation = useNavigation();

  return (
    <View style={[styles.userInfo]}>
      <View style={{marginLeft: 16, marginRight:16}}>
        <View style={[styles.userCard]}>
          <Image
            style={[styles.profileImg]}
            source={require('../../assets/images/bobProfile.png')} //
          />
          <View style={[styles.userWrap]}>
            <View style={[styles.username]}>
              <Text style={[DesignSystem.title3SB, styles.usernameText]}>{name}님</Text>
              <Text style={[DesignSystem.caption1Lt, {color: '#E03D32'}]}>{statusMessage}</Text>
            </View>
            <Text style={[DesignSystem.caption1Lt, styles.userEmail]}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('MyPoint', {point: point})} style={[styles.userPointWrap]}>
          <View style={[DesignSystem.centerArrange, {flexDirection: 'row' }]}>
            <Text style={[DesignSystem.body2Lt, {marginLeft: 20, marginRight: 16}]}>내 포인트</Text>
            <Text style={[DesignSystem.title4Md, {color: '#111111'}]}>{point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
          </View>
          <Image
              style={[styles.MyNextImg]}
              source={require('../../assets/images/arrowGrey10.png')} //
            />
        </TouchableOpacity>
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
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
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
    marginRight: 8,
  },
  userEmail: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  userPointWrap: {
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
