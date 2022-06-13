import React, {useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    progressText: {
      fontSize: 50,
      fontWeight: '200',
      color: '#111111',
    },
  });
  return (
    <View style={[styles.flex]}>
      <View style={styles.bigCircle}>
        <View style={[styles.progressLayer]} />
        <View style={{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-start'}}>
          <Text style={[styles.progressText]}>{progress}</Text>
          <Text style={{fontSize: 25}}>/</Text>
          <Text style={{fontSize: 20, lineHeight: 20}}>10</Text>
        </View>
      </View>
    </View>
  );
};
