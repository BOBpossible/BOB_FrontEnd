import React, {useState} from 'react';
import type {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, Switch, View, Image} from 'react-native';
import {DesignSystem} from '../../assets/DesignSystem';

export type MyNotificationsSwitchProps = {
  text: string;
  value: boolean;
  onValueChange: () => void;
};

export const MyNotificationsSwitch: FC<MyNotificationsSwitchProps> = ({text, value, onValueChange}) => {
  return (
    <View>
      <Text style={[DesignSystem.body1Lt, {marginLeft: 21.88, color: '#000000'}]}>{text}</Text>
      <Switch
        value={value}
        trackColor={{false: '#DFDFDF', true: '#6C69FF'}}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        onValueChange={onValueChange}
        style={{marginRight: 16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eachAlarm: {
    height: 68,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
