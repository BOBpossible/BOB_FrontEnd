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
      zIndex: 0,
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressLayer: {
      zIndex: 2,
      width: radius * 2 - 12,
      height: radius * 2 - 12,
      borderRadius: radius,
      backgroundColor: '#FFFFFF',
      // borderWidth: 6,
      // borderColor: '#615EFF',
      position: 'absolute',
    },
    progressText: {
      fontSize: 50,
      fontWeight: '300',
      color: '#111111',
    },
    progressTextBox: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      zIndex: 3,
    },
  });
  return (
    <View style={[styles.flex]}>
      <View style={styles.bigCircle}>
        <View style={[styles.progressLayer]} />
        <View style={[styles.progressTextBox]}>
          <Text style={[styles.progressText]}>{progress}</Text>
          <Text style={{fontSize: 25}}>/</Text>
          <Text style={{fontSize: 20, lineHeight: 20}}>10</Text>
        </View>
      </View>
    </View>
  );
};
