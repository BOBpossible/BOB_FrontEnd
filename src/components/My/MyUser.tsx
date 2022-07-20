import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {DesignSystem} from '../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../assets/CalculateLength';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MyUserProps = {
  authentication: boolean;
  email: string;
  name: string;
  point: number;
};

export const MyUser: FC<MyUserProps> = ({authentication, email, name, point}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.userInfo]}>
      <View style={{marginLeft: 16, marginRight: 16}}>
        <View style={[styles.userCard]}>
          <FastImage
            style={[styles.profileImg]}
            source={require('../../assets/images/bobProfile.png')} //
          />
          <View style={[styles.userWrap]}>
            <View style={[styles.username]}>
              <Text style={[DesignSystem.title3SB, DesignSystem.grey17]}>{name}님</Text>
            </View>
            <Text style={[DesignSystem.caption1Lt, styles.userEmail]}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyPoint', {point: point})}
          style={[styles.userPointWrap]}
        >
          <View style={[DesignSystem.centerArrange, {flexDirection: 'row'}]}>
            <Text
              style={[DesignSystem.body2Lt, DesignSystem.grey10, {marginLeft: 20, marginRight: 16}]}
            >
              내 포인트
            </Text>
            <Text style={[DesignSystem.title4Md, {color: '#111111'}]}>
              {point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <Icon name="chevron-right" size={18} color="#111111" style={{marginRight: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    height: Platform.OS === 'ios' ? hp(calHeight(148, true)) : hp(calHeight(148)),
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
    height: Platform.OS === 'ios' ? hp(calHeight(48, true)) : hp(calHeight(48)),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  MyNextImg: {
    marginRight: 20,
  },
});
