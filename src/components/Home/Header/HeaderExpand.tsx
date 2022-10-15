import React, {FC} from 'react';
import {View, Animated, Text, StyleSheet, Platform} from 'react-native';
import {useStyle} from '../../../hooks';
import {CircleBar} from './HomeCircleBar';
import {DesignSystem} from '../../../assets/DesignSystem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {calHeight} from '../../../assets/CalculateLength';

type HeaderExpandProps = {
  animatedValue: Animated.Value;
  rewards: number | undefined;
};

export const HeaderExpand: FC<HeaderExpandProps> = ({animatedValue, rewards}) => {
  const circleAnimStyle = useStyle({
    opacity: animatedValue.interpolate({
      inputRange: [30, 60],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [30, 60],
          outputRange: [1, 0.8],
          extrapolate: 'clamp',
        }),
      },
    ],
  });

  return (
    <Animated.View style={[styles.circleWrap, circleAnimStyle]}>
      <CircleBar progress={rewards} />
      <View style={{flexDirection: 'row'}}>
        <Text style={[DesignSystem.grey17, styles.circleBar]}>미션 10개 달성시 </Text>
        <Text style={[DesignSystem.purple5, styles.circleBar]}>1000P</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circleBar: {
    marginTop: Platform.OS === 'ios' ? hp(calHeight(8, true)) : hp(calHeight(8)),
    marginBottom: Platform.OS === 'ios' ? hp(calHeight(14, true)) : hp(calHeight(14)),
    fontFamily: 'Pretendard-Medium',
    fontSize: 13,
    lineHeight: 22,
  },
  circleWrap: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
