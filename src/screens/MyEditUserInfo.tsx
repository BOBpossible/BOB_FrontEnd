import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyStackParamList} from '../nav/MyNavigator';
import {MyHeader} from '../components/My/MyHeader';
import {DesignSystem} from '../assets/DesignSystem';

type Props = NativeStackScreenProps<MyStackParamList, 'MyEditUserInfo'>;

export const MyEditUserInfo = ({navigation, route}: Props) => {
  const [username, setUsername] = useState<string>(route.params.username);
  const [auth, setAuth] = useState<string>(route.params.auth);
  const [email, setEmail] = useState('');
  const [focusedEmail, setFocusedEmail] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };
  function editProfileImg() {
    console.log('수정');
  }

  return (
    <View style={[styles.flex]}>
      <MyHeader
        goBack={goBack}
        title={'회원정보 수정'}
        save={() => {
          //변경한 정보를 서버에 보내기 로직
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
          <View style={[styles.emailNinput]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom:8}]}>이메일</Text>
            <TextInput
              style={[styles.inputText, focusedEmail ? styles.focusBorder : styles.unfocusBorder]}
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onBlur={() => setFocusedEmail(false)}
              onFocus={() => setFocusedEmail(true)}
            />
          </View>
          <View style={[styles.phoneNinput]}>
            <Text style={[DesignSystem.title4Md, {color: 'black', marginBottom:8}]}>전화번호</Text>
            <View style={[styles.phoneAuth]}>
              <Text>🚨전화번호인증🚨</Text>
            </View>
            <Text style={[DesignSystem.caption1Lt, {color: '#E03D32', marginLeft: 8}]}>{auth}</Text>
          </View>
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
    marginTop: 12,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  emailNinput: {
    marginBottom: 20,
  },
  inputText: {
    width: '100%',
    height: 44,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#111111',
  },
  focusBorder: {borderColor: '#6C69FF', borderWidth: 1},
  unfocusBorder: {borderColor: '#DFDFDF', borderWidth: 1},
  phoneNinput: {

  },
  phoneAuth: {

  },
  quitText: {
    color: '#777777',
    fontSize: 14,
    marginRight: 16,
    marginTop: 8,
  },
});
