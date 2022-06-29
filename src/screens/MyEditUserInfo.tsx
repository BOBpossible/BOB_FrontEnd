import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/MyHeader';
import { RegisterName } from '../components';

type Props = NativeStackScreenProps<MyStackParamList, 'MyEditUserInfo'>;

export const MyEditUserInfo = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };
  function editProfileImg() {
    console.log('수정');
  }
  const [username, setUsername] = useState<string>(route.params.username);

  return (
    <View style={[styles.flex]}>
      <MyHeader
        goBack={goBack}
        title={'회원정보 수정'}
        save={() => {
          console.log('저장');
        }}
      />
      <View style={[styles.userInfoProfile]}>
        <TouchableOpacity onPress={editProfileImg} style={[styles.profileWrap]}>
          <Image
            style={[styles.profileImg]}
            source={require('../assets/images/bobProfile.png')} //
          />
          <Image
            style={[styles.editPen]}
            source={require('../assets/images/editPen.png')} //
          />
        </TouchableOpacity>
        <Text style={[styles.usernameText]}>{username}님</Text>
      </View>
      <View style={[styles.userInfoEdit]}>
        <View style={[styles.userInfoEditContent]}>
          {/* 이름
          전화번호 */}
        </View>
      </View>
      <TouchableOpacity onPress={() => console.log('탈퇴')} style={{alignItems: 'flex-end'}}>
        <Text style={[styles.quitText]}>계정탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  userInfoProfile: {
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
  userInfoEdit: {
    height: 222,
    backgroundColor: '#FFFFFF',
  },
  userInfoEditContent: {
    marginLeft: 16,
    marginRight: 16,
  },
  quitText: {
    color: '#777777',
    fontSize: 14,
    marginRight: 16,
    marginTop: 8,
  },
});
