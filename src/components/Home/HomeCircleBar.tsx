import React, {useEffect} from 'react';
import type {FC} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {calHeight} from '../../assets/CalculateLength';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export type CircleBarProps = {
  progress: number;
};
export const CircleBar: FC<CircleBarProps> = ({progress}) => {
  const styles = StyleSheet.create({
    flex: {flex: 1},
    progressText: {
      fontFamily: 'Pretendard-Light',
      fontSize: 45,
      color: '#111111',
    },
    progressTextBox: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-start',
      zIndex: 3,
    },
    progressTotalText: {
      fontFamily: 'Pretendard-Light',
      fontSize: 18,
      color: '#7D7D7D',
    },
  });
  return (
    <View style={[styles.flex]}>
      <AnimatedCircularProgress
        style={{transform: [{scaleX: -1}]}}
        size={Platform.OS === 'ios' ? hp((108 / 812) * 100) : hp(calHeight(108))}
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
