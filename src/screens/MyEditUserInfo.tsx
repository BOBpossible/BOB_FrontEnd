import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';

type Props = NativeStackScreenProps<MyStackParamList, 'MyEditUserInfo'>;

export const MyEditUserInfo = ({navigation}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.flex]}>
      <MyHeader
        goBack={goBack}
        title={'회원정보 수정'}
        save={() => {
          console.log('저장');
        }}
      />
      <View style={[styles.userInfo]}>
        <View style={[styles.profileWrap]}>
          <Image
            style={[styles.profileImg]}
            source={require('../assets/images/tmpUserImage.png')} //
          />
          <Image
            style={[styles.editPen]}
            source={require('../assets/images/editPen.png')} //
          />
        </View>
        <Text style={[styles.usernameText]}>라춘식님</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  userInfo: {
    height: 120,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  profileWrap: {
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#6C69FF',
  },
  editPen: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 53,
    top: 45,
  },
  usernameText: {
    color: '#000000',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});
