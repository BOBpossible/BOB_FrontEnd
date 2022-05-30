import React, {useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native-paper';

export type CircleBarProps = {
  radius: number;
  progress: number;
};
export const CircleBar: FC<CircleBarProps> = ({radius, progress}) => {
  const styles = StyleSheet.create({
    flex: {flex: 1},
    bigCircle: {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      backgroundColor: '#EDEDED',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressLayer: {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      borderWidth: 7,
      borderColor: '#615EFF',
      position: 'absolute',
    },
  });
  return (
    <View style={[styles.flex]}>
      <View style={styles.bigCircle}>
        <View style={[styles.progressLayer]} />
        <Text>{progress}</Text>
      </View>
    </View>
  );
};
