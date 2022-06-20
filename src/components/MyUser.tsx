import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from 'react-native-paper';

export type MyUserProps = {
  userprofile?: any; //?????????
  username: string;
  userid: number;
  status: string; //"start","request","onrequest","success", "review"
};

//prettier-ignore
export const MyUser: FC<MissionUserProps> = ({ userprofile, username, userid, status }) => {
  const [statusMessage, setMessage] = useState("");
  // useEffect(()=>{
  //   if (status==='request') {setMessage('미션중')}
  //   else if (status==='onrequest') {setMessage('사장님 확인중')}
  //   else if (status==='success') {setMessage('미션 성공')}
  // }, [status]);

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
            <Text style={[styles.userauthText]}>인증?</Text>
          </View>
          <Text style={[styles.useridText]}>{userid}</Text>
        </View>
        {/* <View style={[styles.statusWrap]}>
          <View>
            <Text style={[styles.statusText, status === 'success' && { color: '#6C69FF' }]}>{statusMessage}</Text>
          </View>
        </View> */}
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
  },
  profileWrap: {
    marginTop: 16,
    marginLeft: 16,

    marginBottom: 14,
    marginRight: 11,
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
    flexDirection: 'column',
  },
  usernameText: {
    color: '#111111',
    fontSize: 16,
    marginBottom: 2,
  },
  userauthText: {
    color: 'red',
  },
  useridText: {
    fontSize: 14,
    color: '#111111',
  },
  statusWrap: {
    marginRight: 24,
    justifyContent: 'center',
  },
  statusText: {
    color: '#111111',
    fontSize: 16,
  },
});
