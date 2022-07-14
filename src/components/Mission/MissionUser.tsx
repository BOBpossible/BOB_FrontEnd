import React from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MissionUserProps = {
  username?: string;
  userid?: number;
};

//prettier-ignore
export const MissionUser: FC<MissionUserProps> = ({username, userid }) => {

  return (
    <View style={[styles.userCard]}>
      <View style={[styles.profileWrap]}>
        <Image
          style={[styles.profileImg]}
          source={require('../../assets/images/bobProfile.png')} //
        />
      </View>
      <View style={[styles.userWrap]}>
        <Text style={[DesignSystem.title4Md, styles.usernameText]}>{username}</Text>
        <Text style={[DesignSystem.body2Lt, styles.useridText]}>{userid}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingTop: 16,
    paddingBottom: 14,
  },
  profileWrap: {
    marginLeft: 19,
    marginRight: 11,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#DFDFDF',
  },
  userWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  usernameText: {
    color: '#111111',
    marginBottom: 2,
  },
  useridText: {
    color: '#616161',
  },
});
