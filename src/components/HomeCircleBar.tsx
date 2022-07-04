import React, {useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

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
      backgroundColor: '#EDEDED',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressLayer: {
      zIndex: 2,
      width: radius * 2 - 12,
      height: radius * 2 - 12,
      borderRadius: radius,
      backgroundColor: '#FFFFFF',
      position: 'absolute',
    },
    progressText: {
      fontFamily: 'Pretendard-Medium',
      fontSize: 45,
      fontWeight: '200',
      color: '#111111',
    },
    progressTextBox: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      zIndex: 3,
    },
    progressCircleOne: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: radius,
      height: radius * 2,
      backgroundColor: '#615EFF',
      borderRadius: radius,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
      transform: [{rotate: '0deg'}],
    },
    progressTotalText: {
      fontFamily: 'Pretendard-Light',
      fontSize: 18,
      fontWeight: '200',
      color: '#7D7D7D',
    },
  });
  return (
    <View style={[styles.flex]}>
      <AnimatedCircularProgress
        style={{transform: [{scaleX: -1}]}}
        size={108}
        width={5}
        fill={progress * 10}
        tintColor="#615EFF"
        duration={2000}
        rotation={0}
        backgroundColor="#EDEDED"
        lineCap="round"
      >
        {() => (
          <View style={[{transform: [{scaleX: -1}]}, styles.progressTextBox]}>
            <Text style={[styles.progressText]}>{progress}</Text>
            <Text style={[styles.progressTotalText]}>/ </Text>
            <Text style={[styles.progressTotalText]}>10</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};
