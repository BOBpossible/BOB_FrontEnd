import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Colors} from 'react-native-paper';

export type MissionUserProps = {
  userprofile?: any; //?????????프사
  username: string;
  userid: number;
  status?: string; //"start","request","onrequest","success", "review"
};

//prettier-ignore
export const MissionUser: FC<MissionUserProps> = ({ userprofile, username, userid, status }) => {

  return (
    <View style={[styles.userCard]}>
      <View style={[styles.profileWrap]}>
        <Image
          style={[styles.profileImg]}
          source={require('../assets/images/tmpUserImage.png')} //
        />
      </View>
      <View style={[styles.userWrap]}>
        <Text style={[styles.usernameText]}>{username}</Text>
        <Text style={[styles.useridText]}>{userid}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    height: 86,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
  },
  profileWrap: {
    marginTop: 16,
    marginBottom: 14,
    marginLeft: 19,
    marginRight: 11,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  userWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  usernameText: {
    color: '#111111',
    fontSize: 16,
    marginBottom: 2,
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
